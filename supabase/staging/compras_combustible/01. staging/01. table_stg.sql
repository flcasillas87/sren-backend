-- =============================================================================
-- STAGING TABLE
-- Dominio : compras_combustible
-- Uso     : carga cruda de operaciones originales y ajustes posteriores
-- =============================================================================

drop table if exists staging.stg_compras_combustible cascade;

create table staging.stg_compras_combustible (
    id_stg_compra_combustible bigserial primary key,
    batch_id uuid not null,
    fecha_suministro text,
    numero_operacion_dia text,
    rfc_proveedor text,
    nombre_proveedor text,
    nombre_central text,
    nombre_combustible text,
    nombre_unidad_medida text,
    modalidad_mercado text,
    sentido_operacion text,
    cantidad text,
    precio_gas text,
    precio_servicio text,
    moneda text,
    tipo_version text,
    fecha_registro text,
    motivo_actualizacion text,
    documento_referencia text,
    linea_documento text,
    fuente text,
    observaciones text,
    archivo_origen text,
    fecha_carga timestamp default (now() at time zone 'America/Monterrey'),
    usuario_carga uuid default auth.uid()
);

create index if not exists idx_stg_compras_combustible_batch
    on staging.stg_compras_combustible (batch_id);
