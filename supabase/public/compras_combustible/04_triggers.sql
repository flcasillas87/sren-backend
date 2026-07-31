-- =============================================================================
-- TRIGGERS para compras_combustible
-- =============================================================================

drop trigger if exists tr_compras_combustible_updated on public.compras_combustible;

create trigger tr_compras_combustible_updated
before update on public.compras_combustible
for each row
execute function public.set_updated_at_mx();

