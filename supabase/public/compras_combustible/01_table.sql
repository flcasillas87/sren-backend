-- =============================================================================
-- TABLAS DE COMPRAS DE COMBUSTIBLE
-- Grano de compras_combustible:
--   una operacion por dia / proveedor / central / combustible / modalidad /
--   numero de operacion.
-- Grano de compras_combustible_versiones:
--   una fotografia inmutable de cantidad y precios por operacion.
-- =============================================================================

drop table if exists public.compras_combustible_versiones cascade;
drop table if exists public.memoria_calculo_combustible cascade;
drop table if exists public.compras_combustible cascade;

create table public.compras_combustible (
    id_compra_combustible uuid not null default gen_random_uuid(),
    fecha_suministro date not null,
    numero_operacion_dia integer not null default 1,
    id_proveedor uuid not null,
    id_central_generacion uuid not null,
    id_combustible uuid not null,
    id_unidad_medida uuid not null,
    modalidad_mercado text not null,
    sentido_operacion text not null default 'COMPRA',
    moneda text not null default 'MXN',
    documento_referencia text null,
    linea_documento integer not null default 1,
    fuente text null,
    observaciones text null,
    created_at timestamp not null default (now() at time zone 'America/Monterrey'),
    updated_at timestamp not null default (now() at time zone 'America/Monterrey'),
    created_by uuid null default auth.uid(),
    archivo_origen text null,
    fecha_carga timestamp null default (now() at time zone 'America/Monterrey'),
    usuario_carga uuid null default auth.uid()
) tablespace pg_default;

create table public.compras_combustible_versiones (
    id_version_compra_combustible uuid not null default gen_random_uuid(),
    id_compra_combustible uuid not null,
    numero_version integer not null,
    cantidad numeric(18, 4) not null,
    precio_gas numeric(15, 6) not null,
    precio_servicio numeric(15, 6) not null default 0,
    tipo_version text not null default 'ORIGINAL',
    fecha_registro timestamp not null default (now() at time zone 'America/Monterrey'),
    motivo_actualizacion text null,
    documento_referencia text null,
    observaciones text null,
    archivo_origen text null,
    usuario_carga uuid null default auth.uid(),
    created_at timestamp not null default (now() at time zone 'America/Monterrey')
) tablespace pg_default;

create table public.memoria_calculo_combustible (
    id_memoria_calculo_combustible uuid not null default gen_random_uuid(),
    periodo_servicio date not null,
    id_proveedor uuid not null,
    id_central_generacion uuid not null,
    id_combustible uuid not null,
    moneda text not null default 'MXN',
    tasa_iva numeric(7, 6) not null default 0.16,
    poder_calorifico_mj_m3 numeric(15, 6) null,
    pedido text null,
    posicion text null,
    documento text null,
    elaboro text null,
    puesto_elaboro text null,
    reviso text null,
    puesto_reviso text null,
    observaciones text null,
    created_at timestamp not null default (now() at time zone 'America/Monterrey'),
    updated_at timestamp not null default (now() at time zone 'America/Monterrey'),
    created_by uuid null default auth.uid()
) tablespace pg_default;

alter table public.compras_combustible enable row level security;
alter table public.compras_combustible_versiones enable row level security;
alter table public.memoria_calculo_combustible enable row level security;

comment on table public.compras_combustible is
    'Identidad y clasificacion de cada operacion diaria o intradia de combustible.';

comment on table public.compras_combustible_versiones is
    'Historial inmutable de cantidad, precio de gas y precio de servicio de cada operacion.';

comment on table public.memoria_calculo_combustible is
    'Parametros de presentacion y calculo de la memoria mensual; no almacena facturas.';
