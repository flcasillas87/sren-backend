-- =============================================================================
-- CONSTRAINTS para compras_combustible
-- =============================================================================

alter table public.compras_combustible
    add constraint compras_combustible_pkey
        primary key (id_compra_combustible),
    add constraint uq_compras_combustible_operacion
        unique (
            fecha_suministro,
            id_proveedor,
            id_central_generacion,
            id_combustible,
            modalidad_mercado,
            numero_operacion_dia
        ),
    add constraint ck_compras_combustible_numero_operacion
        check (numero_operacion_dia > 0),
    add constraint ck_compras_combustible_linea_documento
        check (linea_documento > 0),
    add constraint ck_compras_combustible_modalidad
        check (modalidad_mercado in ('MDA', 'INTRADAY')),
    add constraint ck_compras_combustible_sentido
        check (sentido_operacion in ('COMPRA', 'VENTA')),
    add constraint ck_compras_combustible_moneda
        check (moneda ~ '^[A-Z]{3}$'),
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

alter table public.compras_combustible_versiones
    add constraint compras_combustible_versiones_pkey
        primary key (id_version_compra_combustible),
    add constraint uq_compras_combustible_version
        unique (id_compra_combustible, numero_version),
    add constraint ck_compras_combustible_version_numero
        check (numero_version > 0),
    add constraint ck_compras_combustible_version_cantidad
        check (cantidad >= 0),
    add constraint ck_compras_combustible_version_precio_gas
        check (precio_gas >= 0),
    add constraint ck_compras_combustible_version_precio_servicio
        check (precio_servicio >= 0),
    add constraint ck_compras_combustible_tipo_version
        check (tipo_version in ('ORIGINAL', 'AJUSTE')),
    add constraint fk_compras_combustible_version_compra
        foreign key (id_compra_combustible)
        references public.compras_combustible(id_compra_combustible)
        on delete restrict,
    add constraint fk_compras_combustible_version_usuario
        foreign key (usuario_carga)
        references auth.users(id);

alter table public.memoria_calculo_combustible
    add constraint memoria_calculo_combustible_pkey
        primary key (id_memoria_calculo_combustible),
    add constraint uq_memoria_calculo_combustible_periodo
        unique (periodo_servicio, id_proveedor, id_central_generacion, id_combustible, moneda),
    add constraint ck_memoria_calculo_periodo
        check (periodo_servicio = date_trunc('month', periodo_servicio)::date),
    add constraint ck_memoria_calculo_tasa_iva
        check (tasa_iva >= 0 and tasa_iva <= 1),
    add constraint ck_memoria_calculo_poder_calorifico
        check (poder_calorifico_mj_m3 is null or poder_calorifico_mj_m3 > 0),
    add constraint ck_memoria_calculo_moneda
        check (moneda ~ '^[A-Z]{3}$'),
    add constraint fk_memoria_calculo_proveedor
        foreign key (id_proveedor)
        references datos_maestros.cat_proveedores(id_proveedor)
        on delete restrict,
    add constraint fk_memoria_calculo_central
        foreign key (id_central_generacion)
        references datos_maestros.cat_centrales_generacion(id_central_generacion)
        on delete restrict,
    add constraint fk_memoria_calculo_combustible
        foreign key (id_combustible)
        references datos_maestros.cat_combustibles(id_combustible)
        on delete restrict,
    add constraint fk_memoria_calculo_created_by
        foreign key (created_by)
        references auth.users(id);
