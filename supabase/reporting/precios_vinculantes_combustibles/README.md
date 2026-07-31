# Reporting: precios_vinculantes_combustibles

Documentacion de las vistas de consumo para precios vinculantes de combustible.

## Objetivo

Exponer la tabla operativa `public.precios_vinculantes_combustibles` como capa
de analitica y BI, con nombres legibles y reglas de consumo estables.

## Vistas incluidas

- `vw_precios_vigentes.sql`
- `vw_precios_detalle.sql`
- `vw_reporte_mensual_por_central.sql`
- `vw_reporte_precios_por_central.sql`
- `vw_comparativo_mensual.sql`
- `vw_historico_auditoria.sql`
- `vw_alertas_vencimiento.sql`
- `00_indexes_and_materialized_views.sql`

## Que hace cada vista

- `vw_precios_vigentes`: precio vigente por central, combustible y unidad.
- `vw_precios_detalle`: detalle diario completo con costo MBTU.
- `vw_reporte_mensual_por_central`: filas diarias para un mes.
- `vw_reporte_precios_por_central`: agregados mensuales por central.
- `vw_comparativo_mensual`: comparacion mes a mes con variacion.
- `vw_historico_auditoria`: historial de cambios de precio.
- `vw_alertas_vencimiento`: registros dentro de la ventana editable.
- `00_indexes_and_materialized_views`: sugerencias de indices y materializaciones.

## Dependencias

- `public.precios_vinculantes_combustibles`
- `public.audit_precios_vinculantes_combustibles`
- `datos_maestros.cat_centrales_generacion`
- `datos_maestros.cat_combustibles`
- `datos_maestros.cat_unidades_medida`

## Recomendaciones

- Mantener esta capa solo para lectura.
- Crear indices si el volumen crece.
- Materializar agregados si Power BI los consulta con frecuencia.
- Revisar que la vista base use `security_invoker = true` si se expone via Data API.
