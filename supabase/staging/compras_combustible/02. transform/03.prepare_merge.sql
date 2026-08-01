-- =============================================================================
-- PREPARE MERGE for compras_combustible
-- =============================================================================

drop table if exists staging.compras_combustible_ready;

create table staging.compras_combustible_ready as
select
    n.*,
    p.id_proveedor,
    cg.id_central_generacion,
    c.id_combustible,
    u.id_unidad_medida
from staging.compras_combustible_normalized n
join datos_maestros.cat_proveedores p
  on upper(btrim(p.rfc)) = n.rfc_proveedor
  or upper(btrim(p.razon_social)) = n.nombre_proveedor
join datos_maestros.cat_centrales_generacion cg
  on regexp_replace(upper(btrim(cg.nombre_central)), '\s+', ' ', 'g') = n.nombre_central
join datos_maestros.cat_combustibles c
  on upper(btrim(c.nombre_combustible)) = n.nombre_combustible
join datos_maestros.cat_unidades_medida u
  on upper(btrim(u.codigo)) = n.nombre_unidad_medida
 and u.id_combustible = c.id_combustible
where not exists (
    select 1
    from staging.vw_compras_combustible_validation_errors e
    where e.source_row = n.source_row
);
