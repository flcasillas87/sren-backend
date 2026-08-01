-- =============================================================================
-- MERGE para compras_combustible
-- Para cargas operativas use etl.pr_load_compras_combustible(batch_id).
-- =============================================================================

call etl.pr_merge_compras_combustible_ready();
