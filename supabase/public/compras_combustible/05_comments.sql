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

