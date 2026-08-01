# Reporting: compras_combustible

Vistas para reproducir la memoria mensual de cálculo de suministro de gas sin
incorporar datos de facturación.

## Vistas

- `vw_compras_version_original`: primera versión de cada operación.
- `vw_compras_version_actual`: última versión conocida.
- `vw_compras_combustible`: detalle legible con importes calculados.
- `vw_compras_ajustes`: original, actual y diferencias de cantidad/precio/importe.
- `vw_compras_diarias`: agregado por día y modalidad.
- `vw_memoria_calculo_detalle_diario`: calendario completo del mes, MDA,
  INTRADAY, total neto y precio ponderado.
- `vw_memoria_calculo_conceptos`: los ocho conceptos de la carátula con subtotal,
  IVA y total.
- `vw_memoria_calculo_resumen`: encabezado y totales mensuales.

## Correspondencia con el Excel

```text
Hoja MDA                  -> modalidad_mercado = MDA, versión original
Hoja MDA.FINAL            -> última versión MDA
Hoja INTRADAY             -> modalidad_mercado = INTRADAY, versión original
Hoja INTRADAY.FINAL       -> última versión INTRADAY
Hoja principal            -> detalle diario + conceptos + resumen
```

Las vistas usan `security_invoker = true` para respetar las políticas RLS de las
tablas subyacentes.
