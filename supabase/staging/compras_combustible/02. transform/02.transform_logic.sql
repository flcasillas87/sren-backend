-- =============================================================================
-- NORMALIZATION for compras_combustible
-- El procedimiento ETL ejecuta esta misma transformacion para un batch concreto.
-- =============================================================================

drop table if exists staging.compras_combustible_normalized;

create table staging.compras_combustible_normalized as
select
    id_stg_compra_combustible as source_row,
    batch_id,
    case
        when btrim(fecha_suministro) ~ '^\d{4}-\d{2}-\d{2}$' then to_date(btrim(fecha_suministro), 'YYYY-MM-DD')
        when btrim(fecha_suministro) ~ '^\d{2}/\d{2}/\d{4}$' then to_date(btrim(fecha_suministro), 'DD/MM/YYYY')
        else null
    end as fecha_suministro,
    case when coalesce(nullif(btrim(numero_operacion_dia), ''), '1') ~ '^\d+$'
         then coalesce(nullif(btrim(numero_operacion_dia), ''), '1')::integer end as numero_operacion_dia,
    upper(btrim(rfc_proveedor)) as rfc_proveedor,
    upper(btrim(nombre_proveedor)) as nombre_proveedor,
    regexp_replace(upper(btrim(nombre_central)), '\s+', ' ', 'g') as nombre_central,
    upper(btrim(nombre_combustible)) as nombre_combustible,
    upper(btrim(nombre_unidad_medida)) as nombre_unidad_medida,
    upper(btrim(modalidad_mercado)) as modalidad_mercado,
    upper(btrim(coalesce(nullif(sentido_operacion, ''), 'COMPRA'))) as sentido_operacion,
    case when replace(replace(replace(btrim(cantidad), ',', ''), '$', ''), ' ', '') ~ '^\d+(\.\d+)?$'
         then replace(replace(replace(btrim(cantidad), ',', ''), '$', ''), ' ', '')::numeric(18,4) end as cantidad,
    case when replace(replace(replace(btrim(precio_gas), ',', ''), '$', ''), ' ', '') ~ '^\d+(\.\d+)?$'
         then replace(replace(replace(btrim(precio_gas), ',', ''), '$', ''), ' ', '')::numeric(15,6) end as precio_gas,
    case when coalesce(nullif(replace(replace(replace(btrim(precio_servicio), ',', ''), '$', ''), ' ', ''), ''), '0') ~ '^\d+(\.\d+)?$'
         then coalesce(nullif(replace(replace(replace(btrim(precio_servicio), ',', ''), '$', ''), ' ', ''), ''), '0')::numeric(15,6) end as precio_servicio,
    upper(btrim(coalesce(nullif(moneda, ''), 'MXN'))) as moneda,
    upper(btrim(coalesce(nullif(tipo_version, ''), 'ORIGINAL'))) as tipo_version,
    case
        when nullif(btrim(fecha_registro), '') is null then fecha_carga
        when btrim(fecha_registro) ~ '^\d{4}-\d{2}-\d{2}([ T]\d{2}:\d{2}(:\d{2})?)?$'
            then btrim(fecha_registro)::timestamp
        when btrim(fecha_registro) ~ '^\d{2}/\d{2}/\d{4}$'
            then to_date(btrim(fecha_registro), 'DD/MM/YYYY')::timestamp
        when btrim(fecha_registro) ~ '^\d{2}/\d{2}/\d{4} \d{2}:\d{2}$'
            then to_timestamp(btrim(fecha_registro), 'DD/MM/YYYY HH24:MI')::timestamp
        when btrim(fecha_registro) ~ '^\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2}$'
            then to_timestamp(btrim(fecha_registro), 'DD/MM/YYYY HH24:MI:SS')::timestamp
        else fecha_carga
    end as fecha_registro,
    nullif(btrim(motivo_actualizacion), '') as motivo_actualizacion,
    nullif(btrim(documento_referencia), '') as documento_referencia,
    case when coalesce(nullif(btrim(linea_documento), ''), '1') ~ '^\d+$'
         then coalesce(nullif(btrim(linea_documento), ''), '1')::integer end as linea_documento,
    coalesce(nullif(btrim(fuente), ''), 'csv_import') as fuente,
    nullif(btrim(observaciones), '') as observaciones,
    nullif(btrim(archivo_origen), '') as archivo_origen,
    fecha_carga,
    usuario_carga
from staging.stg_compras_combustible;
