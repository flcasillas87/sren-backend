-- =============================================================================
-- STAGING TABLE
-- Dominio : compras_combustible
-- Uso     : Carga cruda desde CSV / Excel / API
-- =============================================================================

drop table if exists staging.stg_compras_combustible cascade;

create table staging.stg_compras_combustible (
    id_stg_compra_combustible bigserial primary key,
    batch_id uuid not null default gen_random_uuid(),
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
    fecha_carga timestamp default (now() at time zone 'America/Monterrey'),
    usuario_carga uuid default auth.uid()
);

