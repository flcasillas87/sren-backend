create schema if not exists etl;

create or replace procedure etl.pr_merge_compras_combustible_ready()
language plpgsql
security invoker
as $$
begin
    if exists (
        select 1
        from staging.compras_combustible_ready r
        left join public.compras_combustible c
          on c.fecha_suministro = r.fecha_suministro
         and c.id_proveedor = r.id_proveedor
         and c.id_central_generacion = r.id_central_generacion
         and c.id_combustible = r.id_combustible
         and c.modalidad_mercado = r.modalidad_mercado
         and c.numero_operacion_dia = r.numero_operacion_dia
        where r.tipo_version = 'AJUSTE'
          and c.id_compra_combustible is null
    ) then
        raise exception 'El lote contiene ajustes para operaciones que aun no tienen version original.';
    end if;

    if exists (
        select 1
        from staging.compras_combustible_ready r
        join public.compras_combustible c
          on c.fecha_suministro = r.fecha_suministro
         and c.id_proveedor = r.id_proveedor
         and c.id_central_generacion = r.id_central_generacion
         and c.id_combustible = r.id_combustible
         and c.modalidad_mercado = r.modalidad_mercado
         and c.numero_operacion_dia = r.numero_operacion_dia
        join lateral (
            select v.cantidad, v.precio_gas, v.precio_servicio
            from public.compras_combustible_versiones v
            where v.id_compra_combustible = c.id_compra_combustible
            order by v.numero_version desc
            limit 1
        ) ultima on true
        where r.tipo_version = 'ORIGINAL'
          and (r.cantidad, r.precio_gas, r.precio_servicio)
              is distinct from (ultima.cantidad, ultima.precio_gas, ultima.precio_servicio)
    ) then
        raise exception 'Una operacion ORIGINAL ya existe con valores distintos. Cargue la revision como AJUSTE.';
    end if;

    insert into public.compras_combustible (
        fecha_suministro,
        numero_operacion_dia,
        id_proveedor,
        id_central_generacion,
        id_combustible,
        id_unidad_medida,
        modalidad_mercado,
        sentido_operacion,
        moneda,
        documento_referencia,
        linea_documento,
        fuente,
        observaciones,
        archivo_origen,
        fecha_carga,
        usuario_carga
    )
    select
        fecha_suministro,
        numero_operacion_dia,
        id_proveedor,
        id_central_generacion,
        id_combustible,
        id_unidad_medida,
        modalidad_mercado,
        sentido_operacion,
        moneda,
        documento_referencia,
        linea_documento,
        fuente,
        observaciones,
        archivo_origen,
        fecha_carga,
        usuario_carga
    from staging.compras_combustible_ready
    where tipo_version = 'ORIGINAL'
    on conflict (
        fecha_suministro,
        id_proveedor,
        id_central_generacion,
        id_combustible,
        modalidad_mercado,
        numero_operacion_dia
    ) do update set
        id_unidad_medida = excluded.id_unidad_medida,
        sentido_operacion = excluded.sentido_operacion,
        moneda = excluded.moneda,
        documento_referencia = excluded.documento_referencia,
        linea_documento = excluded.linea_documento,
        fuente = excluded.fuente,
        observaciones = excluded.observaciones,
        archivo_origen = excluded.archivo_origen,
        fecha_carga = excluded.fecha_carga,
        usuario_carga = excluded.usuario_carga;

    with candidatos as (
        select
            r.*,
            c.id_compra_combustible,
            ultima.numero_version as ultima_version,
            ultima.cantidad as ultima_cantidad,
            ultima.precio_gas as ultimo_precio_gas,
            ultima.precio_servicio as ultimo_precio_servicio
        from staging.compras_combustible_ready r
        join public.compras_combustible c
          on c.fecha_suministro = r.fecha_suministro
         and c.id_proveedor = r.id_proveedor
         and c.id_central_generacion = r.id_central_generacion
         and c.id_combustible = r.id_combustible
         and c.modalidad_mercado = r.modalidad_mercado
         and c.numero_operacion_dia = r.numero_operacion_dia
        left join lateral (
            select v.numero_version, v.cantidad, v.precio_gas, v.precio_servicio
            from public.compras_combustible_versiones v
            where v.id_compra_combustible = c.id_compra_combustible
            order by v.numero_version desc
            limit 1
        ) ultima on true
    )
    insert into public.compras_combustible_versiones (
        id_compra_combustible,
        numero_version,
        cantidad,
        precio_gas,
        precio_servicio,
        tipo_version,
        fecha_registro,
        motivo_actualizacion,
        documento_referencia,
        observaciones,
        archivo_origen,
        usuario_carga
    )
    select
        id_compra_combustible,
        coalesce(ultima_version, 0) + 1,
        cantidad,
        precio_gas,
        precio_servicio,
        case when ultima_version is null then 'ORIGINAL' else 'AJUSTE' end,
        fecha_registro,
        motivo_actualizacion,
        documento_referencia,
        observaciones,
        archivo_origen,
        usuario_carga
    from candidatos
    where ultima_version is null
       or (cantidad, precio_gas, precio_servicio)
          is distinct from (ultima_cantidad, ultimo_precio_gas, ultimo_precio_servicio);
end;
$$;

create or replace procedure etl.pr_load_compras_combustible(p_batch_id uuid)
language plpgsql
security invoker
as $$
declare
    v_errores integer;
begin
    perform pg_advisory_xact_lock(hashtext('etl.pr_load_compras_combustible'));

    select count(*) into v_errores
    from staging.vw_compras_combustible_validation_errors
    where batch_id = p_batch_id;

    if v_errores > 0 then
        raise exception 'El lote % contiene % errores. Consulte staging.vw_compras_combustible_validation_errors.',
            p_batch_id, v_errores;
    end if;

    drop table if exists staging.compras_combustible_normalized;
    create table staging.compras_combustible_normalized as
    select
        id_stg_compra_combustible as source_row,
        batch_id,
        case
            when btrim(fecha_suministro) ~ '^\d{4}-\d{2}-\d{2}$' then to_date(btrim(fecha_suministro), 'YYYY-MM-DD')
            else to_date(btrim(fecha_suministro), 'DD/MM/YYYY')
        end as fecha_suministro,
        coalesce(nullif(btrim(numero_operacion_dia), ''), '1')::integer as numero_operacion_dia,
        upper(btrim(rfc_proveedor)) as rfc_proveedor,
        upper(btrim(nombre_proveedor)) as nombre_proveedor,
        regexp_replace(upper(btrim(nombre_central)), '\s+', ' ', 'g') as nombre_central,
        upper(btrim(nombre_combustible)) as nombre_combustible,
        upper(btrim(nombre_unidad_medida)) as nombre_unidad_medida,
        upper(btrim(modalidad_mercado)) as modalidad_mercado,
        upper(btrim(coalesce(nullif(sentido_operacion, ''), 'COMPRA'))) as sentido_operacion,
        replace(replace(replace(btrim(cantidad), ',', ''), '$', ''), ' ', '')::numeric(18,4) as cantidad,
        replace(replace(replace(btrim(precio_gas), ',', ''), '$', ''), ' ', '')::numeric(15,6) as precio_gas,
        coalesce(nullif(replace(replace(replace(btrim(precio_servicio), ',', ''), '$', ''), ' ', ''), ''), '0')::numeric(15,6) as precio_servicio,
        upper(btrim(coalesce(nullif(moneda, ''), 'MXN'))) as moneda,
        upper(btrim(coalesce(nullif(tipo_version, ''), 'ORIGINAL'))) as tipo_version,
        case
            when nullif(btrim(fecha_registro), '') is null then fecha_carga
            when btrim(fecha_registro) ~ '^\d{4}-\d{2}-\d{2}' then btrim(fecha_registro)::timestamp
            when btrim(fecha_registro) ~ '^\d{2}/\d{2}/\d{4}$'
                then to_date(btrim(fecha_registro), 'DD/MM/YYYY')::timestamp
            when btrim(fecha_registro) ~ '^\d{2}/\d{2}/\d{4} \d{2}:\d{2}$'
                then to_timestamp(btrim(fecha_registro), 'DD/MM/YYYY HH24:MI')::timestamp
            else to_timestamp(btrim(fecha_registro), 'DD/MM/YYYY HH24:MI:SS')::timestamp
        end as fecha_registro,
        nullif(btrim(motivo_actualizacion), '') as motivo_actualizacion,
        nullif(btrim(documento_referencia), '') as documento_referencia,
        coalesce(nullif(btrim(linea_documento), ''), '1')::integer as linea_documento,
        coalesce(nullif(btrim(fuente), ''), 'csv_import') as fuente,
        nullif(btrim(observaciones), '') as observaciones,
        nullif(btrim(archivo_origen), '') as archivo_origen,
        fecha_carga,
        usuario_carga
    from staging.stg_compras_combustible
    where batch_id = p_batch_id;

    drop table if exists staging.compras_combustible_ready;
    create table staging.compras_combustible_ready as
    select n.*, p.id_proveedor, cg.id_central_generacion,
           c.id_combustible, u.id_unidad_medida
    from staging.compras_combustible_normalized n
    join datos_maestros.cat_proveedores p
      on upper(btrim(p.rfc)) = n.rfc_proveedor
      or upper(btrim(p.razon_social)) = n.nombre_proveedor
    join datos_maestros.cat_centrales_generacion cg
      on regexp_replace(upper(btrim(cg.nombre_central)), '\s+', ' ', 'g') = n.nombre_central
    join datos_maestros.cat_combustibles c
      on upper(btrim(c.nombre_combustible)) = n.nombre_combustible
    join datos_maestros.cat_unidades_medida u
      on upper(btrim(u.codigo)) = n.nombre_unidad_medida
     and u.id_combustible = c.id_combustible;

    call etl.pr_merge_compras_combustible_ready();

    delete from staging.stg_compras_combustible where batch_id = p_batch_id;
    drop table if exists staging.compras_combustible_normalized;
    drop table if exists staging.compras_combustible_ready;
end;
$$;
