-- =============================================================================
-- VALIDATION VIEW for compras_combustible
-- =============================================================================

drop view if exists staging.vw_compras_combustible_validation_errors;

create view staging.vw_compras_combustible_validation_errors as
with src as (
    select
        id_stg_compra_combustible as source_row,
        fecha_compra,
        rfc_proveedor,
        nombre_proveedor,
        nombre_central,
        nombre_combustible,
        nombre_unidad_medida,
        documento_referencia,
        linea_documento,
        cantidad,
        precio_unitario,
        importe_total,
        moneda,
        fuente
    from staging.stg_compras_combustible
),
duplicados as (
    select
        fecha_compra,
        rfc_proveedor,
        documento_referencia,
        linea_documento
    from staging.stg_compras_combustible
    where nullif(btrim(documento_referencia), '') is not null
    group by fecha_compra, rfc_proveedor, documento_referencia, linea_documento
    having count(*) > 1
)
select source_row, 'fecha_compra' as columna, 'fecha_compra es obligatoria y debe ser valida.' as error_detalle
from src
where nullif(btrim(fecha_compra), '') is null

union all
select source_row, 'rfc_proveedor' as columna, 'rfc_proveedor es obligatorio.' as error_detalle
from src
where nullif(btrim(rfc_proveedor), '') is null

union all
select source_row, 'documento_referencia' as columna, 'documento_referencia es obligatorio.' as error_detalle
from src
where nullif(btrim(documento_referencia), '') is null

union all
select source_row, 'cantidad' as columna, 'cantidad debe ser numerica y mayor a cero.' as error_detalle
from src
where nullif(btrim(cantidad), '') is null
   or replace(replace(replace(btrim(cantidad), ',', ''), '$', ''), ' ', '') !~ '^-?\d+(\.\d+)?$'

union all
select source_row, 'precio_unitario' as columna, 'precio_unitario debe ser numerico y mayor o igual a cero.' as error_detalle
from src
where nullif(btrim(precio_unitario), '') is null
   or replace(replace(replace(btrim(precio_unitario), ',', ''), '$', ''), ' ', '') !~ '^-?\d+(\.\d+)?$'

union all
select source_row, 'importe_total' as columna, 'importe_total debe ser numerico y mayor o igual a cero.' as error_detalle
from src
where nullif(btrim(importe_total), '') is null
   or replace(replace(replace(btrim(importe_total), ',', ''), '$', ''), ' ', '') !~ '^-?\d+(\.\d+)?$'

union all
select s.source_row, 'documento_referencia' as columna, 'El documento ya esta duplicado dentro del archivo.' as error_detalle
from src s
inner join duplicados d
    on coalesce(nullif(btrim(s.fecha_compra), ''), '') = coalesce(nullif(btrim(d.fecha_compra), ''), '')
   and coalesce(nullif(btrim(s.rfc_proveedor), ''), '') = coalesce(nullif(btrim(d.rfc_proveedor), ''), '')
   and coalesce(nullif(btrim(s.documento_referencia), ''), '') = coalesce(nullif(btrim(d.documento_referencia), ''), '')
   and coalesce(nullif(btrim(s.linea_documento), ''), '1') = coalesce(nullif(btrim(d.linea_documento), ''), '1');

