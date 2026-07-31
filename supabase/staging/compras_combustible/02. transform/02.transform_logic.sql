-- =============================================================================
-- NORMALIZATION for compras_combustible
-- =============================================================================

drop table if exists staging.compras_combustible_normalized;

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

