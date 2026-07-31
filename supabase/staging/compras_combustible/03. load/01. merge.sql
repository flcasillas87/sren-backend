-- =============================================================================
-- MERGE para compras_combustible
-- =============================================================================

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

