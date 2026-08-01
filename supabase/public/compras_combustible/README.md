# Modulo: compras_combustible

Registra operaciones MDA e INTRADAY y todas las revisiones posteriores de
cantidad, precio de gas y precio de servicio. No almacena facturas y no utiliza
`es_activo`.

## Modelo

- `public.compras_combustible`: identidad de la operación. Una fecha puede tener
  varias operaciones mediante `numero_operacion_dia`.
- `public.compras_combustible_versiones`: fotografías inmutables de cantidad y
  precios. La versión 1 es original; las siguientes son ajustes.
- `public.memoria_calculo_combustible`: parámetros del reporte mensual, como IVA,
  poder calorífico, pedido y firmantes.

La cantidad se almacena positiva. `sentido_operacion` distingue `COMPRA` y
`VENTA`; las vistas convierten ventas a cantidad negativa. El costo del servicio
se calcula sobre la cantidad absoluta, igual que en la memoria de referencia.

## Reglas de cálculo

```text
cantidad_firmada = COMPRA ? cantidad : -cantidad
importe_gas = cantidad_firmada * precio_gas
importe_servicio = abs(cantidad) * precio_servicio
importe_total = importe_gas + importe_servicio
precio_ponderado_gas = sum(importe_gas) / sum(cantidad_firmada)
volumen_m3 = cantidad_GJ / poder_calorifico_MJ_m3 * 1000
```

Una actualización recibida meses después crea una nueva versión y conserva la
`fecha_suministro` original. `fecha_registro` indica cuándo se conoció la revisión.

## Orden de despliegue

1. `01_table.sql`
2. `02_constraints.sql`
3. `03_indexes.sql`
4. `04_triggers.sql`
5. `05_comments.sql`
6. `etl/compras_combustible.sql`
7. `staging/compras_combustible/02. transform/01.validate.sql`
8. `reporting/compras_combustible/07_view.sql`
9. `06_seeds.sql` solo para pruebas

Las tablas tienen RLS habilitado y no incluyen políticas permisivas. El acceso
debe otorgarse de acuerdo con el modelo de autorización del proyecto.
