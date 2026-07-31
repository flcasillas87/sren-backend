-- =============================================================================
-- CLEANUP para compras_combustible
-- =============================================================================

truncate table staging.stg_compras_combustible;
drop table if exists staging.compras_combustible_normalized;
drop table if exists staging.compras_combustible_ready;

