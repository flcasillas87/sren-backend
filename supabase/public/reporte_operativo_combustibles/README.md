# Modulo: reporte_operativo_combustibles

Este directorio define la tabla `public.reporte_operativo_combustibles` para
reportar la entrega operativa de combustible a cada central generadora.

## Estructura de archivos

- `00_functions.sql`  -> funciones de negocio y validaciones.
- `01_table.sql`      -> definicion de la tabla de hechos.
- `02_constraints.sql` -> claves primarias, foraneas y checks.
- `03_indexes.sql`    -> indices recomendados.
- `04_triggers.sql`   -> triggers de actualizacion y logica de integridad.
- `05_comments.sql`   -> comentarios de tabla y columnas.
- `06_seeds.sql`      -> datos de ejemplo para pruebas.

## Capa de consumo

- `reporting.vw_reporte_operativo_combustibles` expone la vista unificada para BI.

## Proposito

El modelo registra entregas de combustible por central generadora y tipo de
combustible, permitiendo construir reportes operativos de volumen, costos e
informacion de origen.

La unidad de medida se resuelve contra `datos_maestros.cat_unidades_medida` y
se mantiene en la tabla final como `id_unidad_medida`.

## Consideraciones de homologacion

- Usa `datos_maestros.cat_*` para enriquecer la vista de reporting con nombres.
- Sigue la estructura modular de `precios_vinculantes_combustibles` y
  `detalle_suministro_combustibles`.
- La vista `reporting.vw_reporte_operativo_combustibles` expone datos listos para
  consumo de BI.
- La unidad de medida visible en BI viene de `datos_maestros.cat_unidades_medida`.

## Mejora recomendada

- Definir si `importe` debe persistirse o calcularse en la vista.
- Homologar nombres de estados y banderas a `es_activo` donde aplique.
- Revisar si el modulo debe convivir con `compras_combustible` o mantenerse separado.

## Siguientes pasos

- Validar si la metrica `importe` debe guardarse o calcularse en la vista.
- Ajustar el campo `precio_unitario` segun el modelo real de suministro.
- Agregar datos de semilla reales en `06_seeds.sql`.
- Asegurarse de que los catalogos en `datos_maestros.cat_centrales_generacion`,
  `datos_maestros.cat_combustibles` y `datos_maestros.cat_unidades_medida`
  existan antes de ejecutar el seed.
- Añadir triggers y funciones de auditoria cuando la carga tenga reglas de
  negocio adicionales.
