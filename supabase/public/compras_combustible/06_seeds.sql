-- =============================================================================
-- SEEDS para compras_combustible
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
    archivo_origen
)
select
    current_date - 1,
    p.id_proveedor,
    c.id_central_generacion,
    cb.id_combustible,
    u.id_unidad_medida,
    'TEST-SEED-001',
    1,
    1000.0000,
    21.500000,
    21500.00,
    'MXN',
    'seed',
    'Renglón de prueba para validar el módulo de compras de combustible.',
    'seed.sql'
from datos_maestros.cat_proveedores p
join datos_maestros.cat_centrales_generacion c
    on c.nombre_central = 'CTG Parque'
join datos_maestros.cat_combustibles cb
    on cb.nombre_combustible = 'Diesel'
join datos_maestros.cat_unidades_medida u
    on u.codigo = 'Litro'
where p.razon_social = 'CFE ENERGÍA S.A. DE C.V.'
on conflict (
    fecha_compra,
    id_proveedor,
    id_central_generacion,
    id_combustible,
    documento_referencia,
    linea_documento
) do update set
    cantidad = excluded.cantidad,
    precio_unitario = excluded.precio_unitario,
    importe_total = excluded.importe_total,
    moneda = excluded.moneda,
    fuente = excluded.fuente,
    observaciones = excluded.observaciones,
    archivo_origen = excluded.archivo_origen,
    updated_at = now() at time zone 'America/Monterrey';
