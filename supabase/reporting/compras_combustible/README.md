# Reporting: compras_combustible

Vistas de consumo para el modulo de compras de combustible.

## Vistas

- `vw_compras_combustible`
- `vw_compras_diarias`

## Proposito

Exponer la tabla operativa en un formato legible para Power BI y analitica:

- proveedor
- central generadora
- combustible
- unidad de medida
- documento de referencia
- cantidad, precio e importe
- metadatos de origen

## Dependencias

- `public.compras_combustible`
- `datos_maestros.cat_proveedores`
- `datos_maestros.cat_centrales_generacion`
- `datos_maestros.cat_combustibles`
- `datos_maestros.cat_unidades_medida`

## Recomendaciones

- Mantener esta capa sin logica de escritura.
- Evitar exponer IDs internos cuando exista un nombre de negocio equivalente.
- Si el volumen crece, considerar materializacion para agregados diarios.

