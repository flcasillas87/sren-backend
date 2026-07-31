-- =============================================================================
-- TABLA DE COMPRAS DE COMBUSTIBLE
-- Grano: una compra diaria / documento / linea de compra
-- =============================================================================

drop table if exists public.compras_combustible cascade;

create table public.compras_combustible (
    id_compra_combustible uuid not null default gen_random_uuid(),
    fecha_compra date not null,
    id_proveedor uuid not null,
    id_central_generacion uuid not null,
    id_combustible uuid not null,
    id_unidad_medida uuid not null,
    documento_referencia text not null,
    linea_documento integer not null default 1,
    cantidad numeric(18, 4) not null,
    precio_unitario numeric(15, 6) not null,
    importe_total numeric(18, 2) not null,
    moneda text not null default 'MXN',
    fuente text null,
    observaciones text null,
    es_activo boolean default true,
    created_at timestamp default (now() at time zone 'America/Monterrey'),
    updated_at timestamp default (now() at time zone 'America/Monterrey'),
    created_by uuid default auth.uid(),
    archivo_origen text null,
    fecha_carga timestamp null default (now() at time zone 'America/Monterrey'),
    usuario_carga uuid null default auth.uid()
) tablespace pg_default;

