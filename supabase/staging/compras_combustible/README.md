# Staging: compras_combustible

Flujo diario de compras de combustible.

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

