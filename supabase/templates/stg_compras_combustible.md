# Plantilla: stg_compras_combustible

Plantilla de carga para el modulo `compras_combustible`.

## Uso

1. Copia el archivo CSV.
2. Reemplaza los valores de ejemplo por tus compras reales.
3. Mantén los nombres de negocio tal como existen en `datos_maestros`.
4. Sube el archivo al proceso de staging.

## Columnas

- `fecha_compra`: fecha de la compra en `DD/MM/YYYY` o `YYYY-MM-DD`.
- `rfc_proveedor`: RFC del proveedor para validacion rapida.
- `nombre_proveedor`: nombre fiscal del proveedor.
- `nombre_central`: nombre exacto de la central generadora.
- `nombre_combustible`: nombre del combustible.
- `nombre_unidad_medida`: unidad usada en la compra.
- `documento_referencia`: folio, OC, factura o documento de referencia.
- `linea_documento`: numero de linea dentro del documento.
- `cantidad`: volumen o cantidad comprada.
- `precio_unitario`: precio unitario de compra.
- `importe_total`: importe total de la linea.
- `moneda`: moneda de la compra, por ejemplo `MXN`.
- `fuente`: origen del dato, por ejemplo `csv`, `api`, `manual`.
- `observaciones`: notas adicionales.
- `archivo_origen`: nombre del archivo fuente.
- `fecha_carga`: fecha y hora de carga del archivo.
- `usuario_carga`: usuario que realizo la carga, si aplica.

## Reglas

- No capturar IDs.
- Usar nombres exactos de catalogo.
- Dejar `archivo_origen` siempre informado.
- Mantener una fila por linea de compra.
- Si el documento tiene varias lineas, repetir `documento_referencia` y cambiar `linea_documento`.

## Ejemplo

- Proveedor: `CFE ENERGÍA S.A. DE C.V.`
- Central: `CTG Parque`
- Combustible: `Diesel`
- Unidad: `Litro`
- Documento: `OC-PRUEBA-001`
