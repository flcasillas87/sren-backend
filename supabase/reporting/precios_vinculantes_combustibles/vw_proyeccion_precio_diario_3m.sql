-- =============================================================================
-- Vista: proyeccion diaria de precio basada en el promedio mensual
-- de los ultimos 3 meses completos
-- =============================================================================
-- Proposito:
--   Generar una proyeccion diaria por central + combustible + unidad de medida
--   usando el promedio de los promedios mensuales de los ultimos 3 meses
--   completos disponibles en la tabla operativa.
--
-- Criterio de negocio asumido:
--   - Se toman los 3 meses completos previos al mes de la ultima fecha cargada.
--   - La proyeccion se extiende 90 dias hacia adelante desde la ultima fecha real.
--   - El precio proyectado diario es constante por combinacion durante el horizonte.
--
-- Uso sugerido:
--   SELECT * FROM reporting.vw_precios_vinculantes_combustibles_proyeccion_precio_diario_3m
--   ORDER BY fecha_proyectada, central, combustible;
-- =============================================================================
create or replace view reporting.vw_precios_vinculantes_combustibles_proyeccion_precio_diario_3m as
with limite as (
    select
        coalesce(max(pvc.fecha), current_date)::date as fecha_maxima
    from public.precios_vinculantes_combustibles pvc
    where pvc.es_activo = true
),
meses_base as (
    select
        pvc.id_central_generacion,
        pvc.id_combustible,
        pvc.id_unidad_medida,
        date_trunc('month', pvc.fecha)::date as periodo_mes,
        round(avg(pvc.precio_vinculante_combustibles)::numeric, 4) as precio_promedio_mensual
    from public.precios_vinculantes_combustibles pvc
    cross join limite l
    where pvc.es_activo = true
      and pvc.fecha >= (date_trunc('month', l.fecha_maxima) - interval '3 months')::date
      and pvc.fecha < date_trunc('month', l.fecha_maxima)::date
    group by
        pvc.id_central_generacion,
        pvc.id_combustible,
        pvc.id_unidad_medida,
        date_trunc('month', pvc.fecha)::date
),
base_3m as (
    select
        mb.id_central_generacion,
        mb.id_combustible,
        mb.id_unidad_medida,
        round(avg(mb.precio_promedio_mensual)::numeric, 4) as precio_promedio_3m,
        count(*) as meses_utilizados,
        min(mb.periodo_mes) as periodo_inicio,
        max(mb.periodo_mes) as periodo_fin
    from meses_base mb
    group by
        mb.id_central_generacion,
        mb.id_combustible,
        mb.id_unidad_medida
),
proyeccion as (
    select
        gs::date as fecha_proyectada,
        b.id_central_generacion,
        b.id_combustible,
        b.id_unidad_medida,
        b.precio_promedio_3m,
        b.meses_utilizados,
        b.periodo_inicio,
        b.periodo_fin,
        l.fecha_maxima,
        round(b.precio_promedio_3m, 4) as precio_proyectado_diario
    from base_3m b
    cross join limite l
    cross join generate_series(
        l.fecha_maxima + interval '1 day',
        l.fecha_maxima + interval '90 day',
        interval '1 day'
    ) as gs
)
select
    p.fecha_maxima as fecha_base,
    p.fecha_proyectada,
    cg.nombre_central as central,
    c.nombre_combustible as combustible,
    um.descripcion as unidad_medida,
    p.periodo_inicio as mes_inicio_base,
    p.periodo_fin as mes_fin_base,
    p.meses_utilizados,
    p.precio_promedio_3m,
    p.precio_proyectado_diario,
    'promedio_mensual_3m'::text as metodo_proyeccion
from proyeccion p
inner join datos_maestros.cat_centrales_generacion cg
    on cg.id_central_generacion = p.id_central_generacion
inner join datos_maestros.cat_combustibles c
    on c.id_combustible = p.id_combustible
inner join datos_maestros.cat_unidades_medida um
    on um.id_unidad_medida = p.id_unidad_medida;
