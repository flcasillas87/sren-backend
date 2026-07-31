-- Índices y materialized views sugeridos para `precios_vinculantes_combustibles`
-- NO ejecutar en producción sin pruebas previas en staging.

-- 3) Índices recomendados para mejorar filtros, particiones y joins
-- Ajusta nombres según conveniencia del DBA y revisa existencia previa.
-- Índice para consultas por estado activo y fecha
CREATE INDEX IF NOT EXISTS idx_pvc_es_activo_fecha
  ON public.precios_vinculantes_combustibles (es_activo, fecha);

-- Índice compuesto para ventanas y ordenamiento por fecha (desc)
CREATE INDEX IF NOT EXISTS idx_pvc_central_combustible_unidad_fecha
  ON public.precios_vinculantes_combustibles (id_central_generacion, id_combustible, id_unidad_medida, fecha DESC);

-- Índice para auditoría (consultas por id_precio_vinculante_combustible)
CREATE INDEX IF NOT EXISTS idx_audit_idprecio_fecha
  ON public.audit_precios_vinculantes_combustibles (id_precio_vinculante_combustible, fecha_cambio DESC);

-- 4) Materialized views sugeridas (plantilla)
-- Si las vistas del módulo son costosas, materialícelas
-- y programe REFRESH periódicos.

-- Ejemplo: materializar el comparativo mensual
CREATE MATERIALIZED VIEW IF NOT EXISTS reporting.mv_precios_vinculantes_combustibles_comparativo_mensual
AS
  SELECT * FROM reporting.vw_precios_vinculantes_combustibles_comparativo_mensual
WITH NO DATA;

-- Índice útil sobre la materialized view para consultas por año/mes
CREATE INDEX IF NOT EXISTS idx_mv_pvc_comp_ano_mes
  ON reporting.mv_precios_vinculantes_combustibles_comparativo_mensual (anio, mes);

-- Ejemplo: materializar reporte por central (por año-mes)
CREATE MATERIALIZED VIEW IF NOT EXISTS reporting.mv_precios_vinculantes_combustibles_reporte_ano_mes
AS
  SELECT * FROM reporting.vw_precios_vinculantes_combustibles_reporte_ano_mes
WITH NO DATA;

CREATE INDEX IF NOT EXISTS idx_mv_pvc_rep_central_ano_mes
  ON reporting.mv_precios_vinculantes_combustibles_reporte_ano_mes (id_central_generacion, ano, mes);

-- 5) Refrescar materialized views (comandos de ejemplo)
-- REFRESH MATERIALIZED VIEW reporting.mv_precios_vinculantes_combustibles_comparativo_mensual;
-- REFRESH MATERIALIZED VIEW reporting.mv_precios_vinculantes_combustibles_reporte_ano_mes;
-- Para refresco sin bloquear lecturas: use CONCURRENTLY si crea índices únicos
-- y su versión de PG lo soporta: REFRESH MATERIALIZED VIEW CONCURRENTLY <mv>;

-- 6) Sugerencias de operación
-- - Programar REFRESH nightly (ej. a la madrugada) mediante pg_cron o job externo.
-- - Monitorizar tiempo/locks tras aplicar índices en tablas grandes.
-- - Validar impacto en backups y replicación.

-- Fin del script de sugerencias.
