-- =============================================================================
-- COMMENTS para compras_combustible
-- =============================================================================

comment on table public.compras_combustible
    is 'Registro diario de compras de combustible con detalle por documento y linea.';

comment on column public.compras_combustible.fecha_compra
    is 'Fecha en la que se realizo o registro la compra.';

comment on column public.compras_combustible.documento_referencia
    is 'Factura, orden, ticket o folio que identifica la compra.';

comment on column public.compras_combustible.linea_documento
    is 'Secuencia de linea dentro del documento de referencia.';

comment on column public.compras_combustible.id_unidad_medida
    is 'Referencia a la unidad de medida asociada a la compra. FK a datos_maestros.cat_unidades_medida.';

comment on column public.compras_combustible.cantidad
    is 'Cantidad comprada expresada en la unidad de medida indicada.';

comment on column public.compras_combustible.precio_unitario
    is 'Precio unitario por unidad de medida.';

comment on column public.compras_combustible.importe_total
    is 'Importe total de la linea de compra en la moneda registrada.';
