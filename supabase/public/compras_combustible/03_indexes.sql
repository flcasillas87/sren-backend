-- =============================================================================
-- INDEXES para compras_combustible
-- =============================================================================

create index if not exists idx_compras_combustible_periodo
    on public.compras_combustible (
        date_trunc('month', fecha_suministro),
        id_proveedor,
        id_central_generacion,
        id_combustible,
        modalidad_mercado
    );

create index if not exists idx_compras_combustible_documento
    on public.compras_combustible (documento_referencia, linea_documento)
    where documento_referencia is not null;

create index if not exists idx_compras_combustible_version_actual
    on public.compras_combustible_versiones (
        id_compra_combustible,
        numero_version desc
    );

create index if not exists idx_compras_combustible_version_fecha
    on public.compras_combustible_versiones (fecha_registro);

create index if not exists idx_memoria_calculo_periodo
    on public.memoria_calculo_combustible (
        periodo_servicio,
        id_proveedor,
        id_central_generacion,
        id_combustible
    );
