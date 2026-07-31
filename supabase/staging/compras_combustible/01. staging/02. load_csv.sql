-- =============================================================================
-- LOAD CSV para compras_combustible
-- =============================================================================

drop table if exists staging.compras_combustible_raw;

create table staging.compras_combustible_raw (
    fecha_compra text,
    rfc_proveedor text,
    nombre_proveedor text,
    nombre_central text,
    nombre_combustible text,
    nombre_unidad_medida text,
    documento_referencia text,
    linea_documento text,
    cantidad text,
    precio_unitario text,
    importe_total text,
    moneda text,
    fuente text,
    observaciones text,
    archivo_origen text,
    fecha_carga text,
    usuario_carga text
);

\copy staging.compras_combustible_raw (
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
    fuente,
    observaciones,
    archivo_origen,
    fecha_carga,
    usuario_carga
)
from 'C:/ruta/compras_combustible_rows.csv'
with (
    format csv,
    header true,
    encoding 'UTF8'
);

truncate table staging.stg_compras_combustible;

insert into staging.stg_compras_combustible (
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
    fuente,
    observaciones,
    archivo_origen
)
select
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
    fuente,
    observaciones,
    coalesce(nullif(archivo_origen, ''), 'compras_combustible_rows.csv')
from staging.compras_combustible_raw;

drop table if exists staging.compras_combustible_raw;

call etl.pr_load_compras_combustible();

