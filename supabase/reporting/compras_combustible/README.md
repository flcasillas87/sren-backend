# Reporting: compras_combustible

Vistas de consumo para el modulo de compras de combustible.

## Vistas

- `vw_compras_combustible`
- `vw_compras_diarias`
- `vw_compras_mensuales_detalle_diario`
- `vw_compras_mensuales_totales`
- `vw_compras_anuales_totales`
- `vw_compras_cmd_seguimiento`

## Proposito

Exponer la tabla operativa en un formato legible para Power BI y analitica:

- llaves internas para trazabilidad
- proveedor
- central generadora
- CMD referencial de la central
- combustible
- unidad de medida
- documento de referencia
- cantidad, precio e importe
- metadatos de origen
- `vw_compras_combustible` filtra solo registros activos
- `vw_compras_diarias` agrega por dia, unidad, central, combustible y moneda
- `vw_compras_mensuales_detalle_diario` conserva el detalle diario pero agrega totales del mes
- `vw_compras_mensuales_totales` resume por mes
- `vw_compras_anuales_totales` resume por ano
- `vw_compras_cmd_seguimiento` compara el promedio diario mensual contra `capacidad_mw` como referencia operativa del CMD

## Dependencias

- `public.compras_combustible`
- `datos_maestros.cat_proveedores`
- `datos_maestros.cat_centrales_generacion`
- `datos_maestros.cat_combustibles`
- `datos_maestros.cat_unidades_medida`

## Regla de unidad

- La unidad visible en BI se toma de `datos_maestros.cat_unidades_medida`.
- La clave interna sigue siendo `id_unidad_medida` en la tabla operativa.

## Recomendaciones

- Mantener esta capa sin logica de escritura.
- Evitar exponer IDs internos cuando exista un nombre de negocio equivalente.
- Si el volumen crece, considerar materializacion para agregados diarios.
