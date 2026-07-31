-- =============================================================================
-- 05_comments.sql
-- Comentarios para public.reporte_operativo_combustibles
-- =============================================================================

comment on table public.reporte_operativo_combustibles is
    'Reporte operativo de combustible entregado a cada central generadora.';

comment on column public.reporte_operativo_combustibles.id_reporte_operativo_combustibles is
    'Clave primaria del reporte operativo.';

comment on column public.reporte_operativo_combustibles.fecha_entrega is
    'Fecha de entrega del combustible a la central generadora.';

comment on column public.reporte_operativo_combustibles.id_central_generacion is
    'Referencia a la central generadora que recibe el combustible.';

comment on column public.reporte_operativo_combustibles.id_combustible is
    'Referencia al tipo de combustible entregado.';

comment on column public.reporte_operativo_combustibles.id_unidad_medida is
    'Referencia a la unidad de medida del volumen entregado. FK a datos_maestros.cat_unidades_medida.';

comment on column public.reporte_operativo_combustibles.volumen is
    'Volumen de combustible entregado en la unidad especificada.';

comment on column public.reporte_operativo_combustibles.fecha_carga is
    'Fecha y hora de carga del registro.';

comment on column public.reporte_operativo_combustibles.usuario_carga is
    'Usuario que registro la carga.';

comment on column public.reporte_operativo_combustibles.es_activo is
    'Indicador de registro activo para reportes y consultas.';
