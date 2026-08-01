-- =============================================================================
-- VALIDATION VIEW for compras_combustible
-- =============================================================================

drop view if exists staging.vw_compras_combustible_validation_errors;

create view staging.vw_compras_combustible_validation_errors as
with src as (
    select s.*,
        upper(btrim(s.rfc_proveedor)) as rfc_norm,
        upper(btrim(s.nombre_proveedor)) as proveedor_norm,
        regexp_replace(upper(btrim(s.nombre_central)), '\s+', ' ', 'g') as central_norm,
        upper(btrim(s.nombre_combustible)) as combustible_norm,
        upper(btrim(s.nombre_unidad_medida)) as unidad_norm
    from staging.stg_compras_combustible s
), errores_basicos as (
    select id_stg_compra_combustible as source_row, batch_id,
           'fecha_suministro'::text as columna, 'Fecha de suministro obligatoria en formato YYYY-MM-DD o DD/MM/YYYY.'::text as error_detalle
    from src
    where nullif(btrim(fecha_suministro), '') is null
       or btrim(fecha_suministro) !~ '^(\d{4}-\d{2}-\d{2}|\d{2}/\d{2}/\d{4})$'
    union all
    select id_stg_compra_combustible, batch_id, 'numero_operacion_dia', 'Debe ser un entero mayor a cero.'
    from src
    where case
        when coalesce(nullif(btrim(numero_operacion_dia), ''), '1') ~ '^\d+$'
            then coalesce(nullif(btrim(numero_operacion_dia), ''), '1')::numeric <= 0
        else true
    end
    union all
    select id_stg_compra_combustible, batch_id, 'modalidad_mercado', 'Solo se admite MDA o INTRADAY.'
    from src where upper(btrim(coalesce(modalidad_mercado, ''))) not in ('MDA', 'INTRADAY')
    union all
    select id_stg_compra_combustible, batch_id, 'sentido_operacion', 'Solo se admite COMPRA o VENTA.'
    from src where upper(btrim(coalesce(sentido_operacion, 'COMPRA'))) not in ('COMPRA', 'VENTA')
    union all
    select id_stg_compra_combustible, batch_id, 'cantidad', 'Debe ser numerica y mayor o igual a cero.'
    from src where nullif(btrim(cantidad), '') is null
       or replace(replace(replace(btrim(cantidad), ',', ''), '$', ''), ' ', '') !~ '^\d+(\.\d+)?$'
    union all
    select id_stg_compra_combustible, batch_id, 'precio_gas', 'Debe ser numerico y mayor o igual a cero.'
    from src where nullif(btrim(precio_gas), '') is null
       or replace(replace(replace(btrim(precio_gas), ',', ''), '$', ''), ' ', '') !~ '^\d+(\.\d+)?$'
    union all
    select id_stg_compra_combustible, batch_id, 'precio_servicio', 'Debe ser numerico y mayor o igual a cero.'
    from src where coalesce(nullif(replace(replace(replace(btrim(precio_servicio), ',', ''), '$', ''), ' ', ''), ''), '0') !~ '^\d+(\.\d+)?$'
    union all
    select id_stg_compra_combustible, batch_id, 'tipo_version', 'Solo se admite ORIGINAL o AJUSTE.'
    from src where upper(btrim(coalesce(tipo_version, 'ORIGINAL'))) not in ('ORIGINAL', 'AJUSTE')
    union all
    select id_stg_compra_combustible, batch_id, 'linea_documento', 'Debe ser un entero mayor a cero.'
    from src
    where case
        when coalesce(nullif(btrim(linea_documento), ''), '1') ~ '^\d+$'
            then coalesce(nullif(btrim(linea_documento), ''), '1')::numeric <= 0
        else true
    end
    union all
    select id_stg_compra_combustible, batch_id, 'fecha_registro',
           'Use YYYY-MM-DD[ HH:MM:SS] o DD/MM/YYYY[ HH:MM:SS].'
    from src
    where nullif(btrim(fecha_registro), '') is not null
      and btrim(fecha_registro) !~ '^(\d{4}-\d{2}-\d{2}|\d{2}/\d{2}/\d{4})([ T]\d{2}:\d{2}(:\d{2})?)?$'
    union all
    select id_stg_compra_combustible, batch_id, 'moneda', 'Debe ser un codigo ISO de tres letras.'
    from src where upper(btrim(coalesce(nullif(moneda, ''), 'MXN'))) !~ '^[A-Z]{3}$'
), errores_catalogo as (
    select s.id_stg_compra_combustible as source_row, s.batch_id,
           'proveedor'::text as columna, 'Proveedor no encontrado de forma univoca.'::text as error_detalle
    from src s
    where (select count(*) from datos_maestros.cat_proveedores p
           where upper(btrim(p.rfc)) = s.rfc_norm
              or upper(btrim(p.razon_social)) = s.proveedor_norm) <> 1
    union all
    select s.id_stg_compra_combustible, s.batch_id, 'central', 'Central no encontrada de forma univoca.'
    from src s
    where (select count(*) from datos_maestros.cat_centrales_generacion c
           where regexp_replace(upper(btrim(c.nombre_central)), '\s+', ' ', 'g') = s.central_norm) <> 1
    union all
    select s.id_stg_compra_combustible, s.batch_id, 'combustible', 'Combustible no encontrado de forma univoca.'
    from src s
    where (select count(*) from datos_maestros.cat_combustibles c
           where upper(btrim(c.nombre_combustible)) = s.combustible_norm) <> 1
    union all
    select s.id_stg_compra_combustible, s.batch_id, 'unidad_medida', 'Unidad no encontrada o incompatible con el combustible.'
    from src s
    where (select count(*)
           from datos_maestros.cat_unidades_medida u
           join datos_maestros.cat_combustibles c on c.id_combustible = u.id_combustible
           where upper(btrim(u.codigo)) = s.unidad_norm
             and upper(btrim(c.nombre_combustible)) = s.combustible_norm) <> 1
), duplicados as (
    select id_stg_compra_combustible as source_row, batch_id
    from (
        select s.*,
            count(*) over (
                partition by batch_id, fecha_suministro, rfc_norm, central_norm,
                    combustible_norm, upper(btrim(modalidad_mercado)),
                    coalesce(nullif(btrim(numero_operacion_dia), ''), '1')
            ) as repeticiones
        from src s
    ) d
    where repeticiones > 1
)
select * from errores_basicos
union all
select * from errores_catalogo
union all
select source_row, batch_id, 'operacion'::text,
       'La operacion esta duplicada dentro del mismo lote.'::text
from duplicados;
