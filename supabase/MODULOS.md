# Catalogo de modulos

Inventario funcional del repositorio y observaciones de homologacion.

## `datos_maestros`

Catalogos y relaciones de referencia.

Modulos principales:

- `cat_centrales_generacion`
- `cat_centros_gestores`
- `cat_combustibles`
- `cat_contratos_transporte`
- `cat_monedas`
- `cat_pospres`
- `cat_proveedores`
- `cat_puntos_entrega`
- `cat_sociedades`
- `cat_trabajadores`
- `cat_unidades_medida`
- `organigrama`
- `rel_contratos_puntos`

Observaciones:

- Hay mezcla de `activo` y `es_activo`.
- Algunos modulos legacy viven como archivos sueltos, no como carpetas homogeneas.
- Conviene consolidar comentarios, seeds y vistas bajo el mismo patron `01` a `07`.

## `public`

Tablas finales de negocio y consumo operativo.

Modulos principales:

- `cargo_fijo`
- `cargo_interconexion`
- `cargo_penalizaciones`
- `cargo_variable`
- `compras_combustible`
- `detalle_suministro_combustibles`
- `diario_costos_detalle`
- `diario_documentos`
- `diario_pagos`
- `flujo_dolares`
- `precios_vinculantes_combustibles`
- `reporte_operativo_combustibles`

Observaciones:

- `precios_vinculantes_combustibles` funciona como tabla de hechos y tiene auditoria propia.
- `compras_combustible` ya sigue el modelo de hechos diarios con vista de reporting.
- `detalle_suministro_combustibles` parece un modelo alterno o legacy y merece decision formal: mantener, migrar o retirar.
- Los cargos especializados estan mejor separados que una tabla unica de detalles.

## `staging`

Carga cruda, validacion y normalizacion.

Modulos principales:

- `cat_centros_gestores`
- `cat_proveedores`
- `cat_sociedades`
- `cat_unidades_medida`
- `diario_documentos`
- `precios_vinculantes_combustibles`
- `compras_combustible`

Observaciones:

- El estandar correcto es `stg_*` con `batch_id`.
- El `load_csv` debe orquestar el proceso completo o delegar a `etl`.
- Las validaciones deben quedarse en staging, no en la tabla final.

## `etl`

Procedimientos de carga y transformacion.

Modulos actuales:

- `precios_vinculantes_combustibles`
- `compras_combustible`
- `diario_documentos`
- `cat_proveedores`
- `cat_centros_gestores`

Observaciones:

- Aqui debe vivir la orquestacion, no la definicion de tablas finales.
- Es el lugar correcto para homologar mapeos, upserts y limpieza post-carga.

## `reporting`

Vistas de consumo para Power BI y analitica.

Modulos principales:

- `precios_vinculantes_combustibles`
- `compras_combustible`
- `diario_documentos`
- `diario_pagos`
- `cargo_fijo`
- `cargo_interconexion`
- `flujo_dolares`
- `cat_*` selectos

Observaciones:

- Las vistas deben ser legibles y estables para el consumidor.
- Es preferible exponer nombres descriptivos y no claves internas.

## `shared`

Funciones y vistas reutilizables.

Observaciones:

- Las funciones de auditoria y `updated_at` deben vivir aqui o en un solo sitio comun.
- Evitar duplicar funciones similares por modulo.

## Mejores cambios propuestos

1. Homologar todos los modulos nuevos con `observaciones`, `archivo_origen`, `fecha_carga`, `usuario_carga`.
2. Preferir `es_activo` en nuevas tablas.
3. Mover la logica de negocio a `etl` y dejar `public` solo como persistencia final.
4. Mantener `reporting` como capa de consumo.
5. Revisar `detalle_suministro_combustibles` como modelo legacy o alterno.
6. Completar README por modulo donde falte, empezando por `compras_combustible`.

