create schema if not exists etl;

create or replace procedure etl.pr_load_compras_combustible()
language plpgsql
as $$
begin
    drop table if exists staging.compras_combustible_normalized;
    drop table if exists staging.compras_combustible_ready;

    create table staging.compras_combustible_normalized as
    select
        id_stg_compra_combustible as source_row,
        batch_id,
        case
            when nullif(btrim(fecha_compra), '') is null then null
            when btrim(fecha_compra) ~ '^\d{4}-\d{2}-\d{2}$' then to_date(btrim(fecha_compra), 'YYYY-MM-DD')
            when btrim(fecha_compra) ~ '^\d{2}/\d{2}/\d{4}$' then to_date(btrim(fecha_compra), 'DD/MM/YYYY')
            else null
        end as fecha_compra,
        upper(btrim(rfc_proveedor)) as rfc_proveedor,
        upper(btrim(nombre_proveedor)) as nombre_proveedor,
        regexp_replace(upper(btrim(nombre_central)), '\s+', ' ', 'g') as nombre_central,
        upper(btrim(nombre_combustible)) as nombre_combustible,
        upper(btrim(nombre_unidad_medida)) as nombre_unidad_medida,
        nullif(btrim(documento_referencia), '') as documento_referencia,
        case
            when nullif(btrim(linea_documento), '') is null then 1
            when btrim(linea_documento) ~ '^\d+$' then btrim(linea_documento)::integer
            else null
        end as linea_documento,
        case
            when nullif(replace(replace(replace(btrim(cantidad), ',', ''), '$', ''), ' ', ''), '') ~ '^-?\d+(\.\d+)?$'
            then replace(replace(replace(btrim(cantidad), ',', ''), '$', ''), ' ', '')::numeric(18,4)
            else null
        end as cantidad,
        case
            when nullif(replace(replace(replace(btrim(precio_unitario), ',', ''), '$', ''), ' ', ''), '') ~ '^-?\d+(\.\d+)?$'
            then replace(replace(replace(btrim(precio_unitario), ',', ''), '$', ''), ' ', '')::numeric(15,6)
            else null
        end as precio_unitario,
        case
            when nullif(replace(replace(replace(btrim(importe_total), ',', ''), '$', ''), ' ', ''), '') ~ '^-?\d+(\.\d+)?$'
            then replace(replace(replace(btrim(importe_total), ',', ''), '$', ''), ' ', '')::numeric(18,2)
            else null
        end as importe_total,
        coalesce(nullif(upper(btrim(moneda)), ''), 'MXN') as moneda,
        coalesce(nullif(btrim(fuente), ''), 'csv_import') as fuente,
        nullif(btrim(observaciones), '') as observaciones,
        nullif(btrim(archivo_origen), '') as archivo_origen,
        fecha_carga,
        usuario_carga
    from staging.stg_compras_combustible;

    create table staging.compras_combustible_ready as
    select
        n.source_row,
        n.batch_id,
        n.fecha_compra,
        p.id_proveedor,
        cg.id_central_generacion,
        c.id_combustible,
        u.id_unidad_medida,
        n.documento_referencia,
        n.linea_documento,
        n.cantidad,
        n.precio_unitario,
        n.importe_total,
        n.moneda,
        n.fuente,
        n.observaciones,
        n.archivo_origen,
        n.fecha_carga,
        n.usuario_carga
    from staging.compras_combustible_normalized n
    join datos_maestros.cat_proveedores p
      on (
            upper(btrim(p.rfc)) = n.rfc_proveedor
            or upper(btrim(p.razon_social)) = n.nombre_proveedor
         )
    join datos_maestros.cat_centrales_generacion cg
      on regexp_replace(upper(btrim(cg.nombre_central)), '\s+', ' ', 'g') = n.nombre_central
    join datos_maestros.cat_combustibles c
      on upper(btrim(c.nombre_combustible)) = n.nombre_combustible
    join datos_maestros.cat_unidades_medida u
      on upper(btrim(u.codigo)) = n.nombre_unidad_medida
     and u.id_combustible = c.id_combustible
    where not exists (
        select 1
        from staging.vw_compras_combustible_validation_errors e
        where e.source_row = n.source_row
    );

    insert into public.compras_combustible (
        fecha_compra,
        id_proveedor,
        id_central_generacion,
        id_combustible,
        id_unidad_medida,
        documento_referencia,
        linea_documento,
        cantidad,
        precio_unitario,
        importe_total,
        moneda,
        fuente,
        observaciones,
        archivo_origen,
        es_activo
    )
    select
        fecha_compra,
        id_proveedor,
        id_central_generacion,
        id_combustible,
        id_unidad_medida,
        documento_referencia,
        linea_documento,
        cantidad,
        precio_unitario,
        importe_total,
        moneda,
        fuente,
        observaciones,
        archivo_origen,
        true
    from staging.compras_combustible_ready
    on conflict (fecha_compra, id_proveedor, id_central_generacion, id_combustible, documento_referencia, linea_documento)
    do update
    set
        id_unidad_medida = excluded.id_unidad_medida,
        cantidad = excluded.cantidad,
        precio_unitario = excluded.precio_unitario,
        importe_total = excluded.importe_total,
        moneda = excluded.moneda,
        fuente = excluded.fuente,
        observaciones = excluded.observaciones,
        archivo_origen = excluded.archivo_origen,
        es_activo = true,
        updated_at = (now() at time zone 'America/Monterrey');

    truncate table staging.stg_compras_combustible;
    drop table if exists staging.compras_combustible_normalized;
    drop table if exists staging.compras_combustible_ready;
end;
$$;

