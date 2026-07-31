-- =============================================================================
-- CONSTRAINTS para compras_combustible
-- =============================================================================

alter table public.compras_combustible
    add constraint compras_combustible_pkey
        primary key (id_compra_combustible),
    add constraint uq_compras_combustible_documento_linea
        unique (fecha_compra, id_proveedor, id_central_generacion, id_combustible, documento_referencia, linea_documento),
    add constraint fk_compras_combustible_proveedor
        foreign key (id_proveedor)
        references datos_maestros.cat_proveedores(id_proveedor)
        on delete restrict,
    add constraint fk_compras_combustible_central
        foreign key (id_central_generacion)
        references datos_maestros.cat_centrales_generacion(id_central_generacion)
        on delete restrict,
    add constraint fk_compras_combustible_combustible
        foreign key (id_combustible)
        references datos_maestros.cat_combustibles(id_combustible)
        on delete restrict,
    add constraint fk_compras_combustible_unidad_medida
        foreign key (id_unidad_medida)
        references datos_maestros.cat_unidades_medida(id_unidad_medida)
        on delete restrict,
    add constraint fk_compras_combustible_created_by
        foreign key (created_by)
        references auth.users(id);
