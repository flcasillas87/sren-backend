# Modulo: compras_combustible

Tabla  para registrar compras diarias de combustible.

## Objetivo

Guardar cada compra con su proveedor, central, combustible, unidad, documento de referencia y metadatos de carga.

La unidad de medida se normaliza contra `datos_maestros.cat_unidades_medida` y
se expone como `id_unidad_medida` en la tabla final.

## Capas relacionadas

- `staging/compras_combustible`: recibe el archivo crudo y valida datos.
- `etl/compras_combustible.sql`: resuelve llaves, normaliza y publica.
- `public/compras_combustible`: tabla final operativa.
- `reporting/compras_combustible`: vistas de consumo para BI.

## Tabla principal

`public.compras_combustible`

Campos relevantes:

- `fecha_compra`
- `id_proveedor`
- `id_central_generacion`
- `id_combustible`
- `id_unidad_medida`
- `documento_referencia`
- `linea_documento`
- `cantidad`
- `precio_unitario`
- `importe_total`
- `moneda`
- `fuente`
- `observaciones`
- `es_activo`
- `created_at`
- `updated_at`
- `created_by`
- `archivo_origen`
- `fecha_carga`
- `usuario_carga`

## Reglas de negocio

- Una compra se identifica por `fecha_compra + id_proveedor + id_central_generacion + id_combustible + documento_referencia + linea_documento`.
- El modelo es diario, no mensual.
- La vista de reporting agrega por dia, central y combustible.
- La unidad de medida siempre se resuelve contra el catalogo maestro antes de publicar.
- El seed de prueba debe usar claves naturales, no UUID fijos.
- Los renglones de respaldo pueden quedar con `es_activo = false` y `cantidad = 0` para no contaminar sumas ni BI.

## Recomendaciones

- Mantener la granularidad diaria.
- Separar compras de precios de referencia.
- Agregar al menos un seed de prueba por combustible relevante cuando se pruebe el ETL.
- Si se requiere trazabilidad extra, agregar `updated_by` de forma consistente con el resto del proyecto.
- Para seguimiento operativo, usar `vw_compras_cmd_seguimiento` como referencia de capacidad de central frente al promedio diario mensual.
- El `CMD` se toma como referencia operativa desde `datos_maestros.cat_centrales_generacion.capacidad_mw`.
