# Estándares del proyecto

Este documento define el lenguaje común para las tablas, vistas y procesos del repositorio.

## Capas del proyecto

- `staging`: carga cruda, validación y normalización.
- `etl`: procedimientos de orquestación y carga final.
- `datos_maestros`: catálogos y relaciones de referencia.
- `public`: tablas operativas y hechos finales.
- `reporting`: vistas de consumo para BI y analítica.
- `shared`: funciones y vistas reutilizables.

## Convenciones de nombres

- Tablas y columnas en `snake_case`.
- Prefijos funcionales:
  - `cat_` para catálogos.
  - `stg_` para staging.
  - `vw_` para vistas.
  - `audit_` para auditoría.
  - `rel_` para relaciones.
- Llaves primarias:
  - `id_<entidad>` para tablas persistentes.
  - `id_stg_<entidad>` para staging.
  - `id_audit_<entidad>` para auditoría.

## Columnas base recomendadas

### Tablas persistentes

- `created_at`
- `updated_at`
- `observaciones`
- `archivo_origen`
- `fecha_carga`
- `usuario_carga`

### Tablas transaccionales

- `es_activo` como bandera de vigencia o disponibilidad.
- `created_by` solo si la trazabilidad funcional lo requiere.
- `updated_by` solo si existe edición humana explícita.

### Staging

- `batch_id` para agrupar una corrida.
- `archivo_origen` para rastrear la fuente.
- `fecha_carga` y `usuario_carga` para auditoria de ingestión.
- Columna original en texto para cada dato entrante.

### Auditoria

- `id_audit_*`
- `id_*` de la tabla base
- `precio_anterior`, `precio_nuevo` o campos equivalentes
- `usuario_cambio`
- `fecha_cambio`

## Reglas de estandarizacion

- Preferir `es_activo` en tablas nuevas.
- Evitar columnas genéricas como `nombre` cuando el dominio sea especifico; usar `nombre_combustible`, `nombre_central`, `nombre_proveedor`, etc.
- Separar precio, cantidad e importe:
  - `precio_*` para tarifas unitarias.
  - `cantidad` o `volumen` para magnitud fisica.
  - `importe_*` para valores monetarios.
- Fechas de negocio con prefijo `fecha_*`.
- Columnas de estado documental con nombres claros, no codigos ambiguos.

## Modelo de despliegue recomendado

1. Crear o actualizar catálogos en `datos_maestros`.
2. Cargar staging y validar.
3. Ejecutar `etl`.
4. Publicar en `public`.
5. Exponer a consumo mediante `reporting`.

## Criterio de compatibilidad

Las tablas legacy pueden conservar nombres historicos si ya existen dependencias, pero el objetivo para nuevas tablas es:

- `es_activo` en lugar de `activo`.
- `id_*` consistentes por entidad.
- Metadatos de carga completos.
- Vistas de consumo en `reporting`.

