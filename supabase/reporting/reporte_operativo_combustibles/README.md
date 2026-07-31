# Reporting: reporte_operativo_combustibles

Vista de consumo para el modulo operativo de entregas de combustible.

## Vista

- `vw_reporte_operativo_combustibles.sql`

## Proposito

Exponer la tabla `public.reporte_operativo_combustibles` con nombres legibles
para Power BI y analitica.

## Dependencias

- `public.reporte_operativo_combustibles`
- `datos_maestros.cat_centrales_generacion`
- `datos_maestros.cat_combustibles`
- `datos_maestros.cat_unidades_medida`

## Recomendaciones

- Mantener la capa sin logica de escritura.
- Evitar mezclar entregas operativas con compras.
- Si el volumen crece, considerar materializacion de agregados.
