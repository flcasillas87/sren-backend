# Staging: compras_combustible

Carga por lotes de operaciones originales y ajustes de combustible.

## Orden recomendado

1. Crear `staging.stg_compras_combustible`.
2. Crear `staging.vw_compras_combustible_validation_errors`.
3. Cargar el CSV asignando un único `batch_id` a toda la corrida.
4. Ejecutar `call etl.pr_load_compras_combustible(batch_id)`.
5. Consultar la vista de errores si la transacción es rechazada.

## Comportamiento

- Todo el archivo entra primero como texto.
- El ETL resuelve proveedor, central, combustible y unidad contra
  `datos_maestros`.
- Ninguna fila con errores se publica y el lote se conserva para diagnóstico.
- Un `AJUSTE` requiere que exista previamente su operación.
- Una versión idéntica a la última se ignora para hacer la carga idempotente.
- El proceso se serializa con un advisory lock para evitar colisiones entre
  cargas concurrentes.
- Tras una carga exitosa solo se eliminan las filas del `batch_id` procesado.

La plantilla se encuentra en `supabase/templates/stg_compras_combustible.csv`.
