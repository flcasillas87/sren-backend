# Staging: compras_combustible

Flujo diario de compras de combustible alineado a `ESTANDARES.md`.

Orden recomendado:

1. `01. staging/01. table_stg.sql`
2. `01. staging/02. load_csv.sql`
3. `02. transform/01.validate.sql`
4. `02. transform/02.transform_logic.sql`
5. `02. transform/03.prepare_merge.sql`
6. `03. load/01. merge.sql`
7. `03. load/02. clean.sql`

El proceso carga compras diarias con:

- fecha de compra
- proveedor
- central generadora
- combustible
- unidad de medida
- cantidad
- precio unitario
- importe total
- documento de referencia
- metadatos de carga

## Reglas principales

- El archivo debe cargar texto bruto primero.
- La validacion debe resolver proveedor, central, combustible y unidad contra `datos_maestros`.
- La escritura final pertenece a `etl.pr_load_compras_combustible()`.
- El grano es diario por documento y linea.

## Metadatos esperados

- `archivo_origen`
- `fecha_carga`
- `usuario_carga`
- `observaciones`
