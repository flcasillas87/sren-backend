# Plantilla: stg_compras_combustible

Plantilla de carga para operaciones y ajustes del modulo `compras_combustible`.

## Columnas

- `fecha_suministro`: día para el que aplica el volumen (`YYYY-MM-DD` o `DD/MM/YYYY`).
- `numero_operacion_dia`: secuencia desde 1 cuando hay varias operaciones sin hora.
- `rfc_proveedor` / `nombre_proveedor`: claves naturales para resolver el proveedor.
- `nombre_central`, `nombre_combustible`, `nombre_unidad_medida`: catálogos maestros.
- `modalidad_mercado`: `MDA` o `INTRADAY`.
- `sentido_operacion`: `COMPRA` o `VENTA`; la cantidad siempre se carga positiva.
- `cantidad`, `precio_gas`, `precio_servicio`: fotografía completa de la versión.
- `tipo_version`: `ORIGINAL` para la primera carga o `AJUSTE` para una revisión.
- `fecha_registro`: cuándo se recibió la versión; no cambia `fecha_suministro`.
- `motivo_actualizacion`: explicación del ajuste.
- Los campos restantes conservan referencia y trazabilidad de origen.

Una carga `AJUSTE` requiere que la operación original ya exista. Si los valores son
idénticos a la última versión, el ETL es idempotente y no agrega otra versión.
