-- =============================================================================
-- INDEXES para compras_combustible
-- =============================================================================

create index if not exists idx_compras_combustible_fecha
    on public.compras_combustible (fecha_compra);

create index if not exists idx_compras_combustible_proveedor_central
    on public.compras_combustible (id_proveedor, id_central_generacion, id_combustible);
