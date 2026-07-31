# Modulo legacy: detalle_suministro_combustibles

Este directorio contiene el modelo alterno `public.fact_precio_vinculante`.
Su proposito original era almacenar precios por combustible y region con vigencia,
pero hoy debe evaluarse como modelo legacy frente a `precios_vinculantes_combustibles`.

Estructura de archivos
----------------------
- `00_functions.sql`  → funciones relacionadas con el modelo.
- `01_table.sql`      → definición de la tabla de hechos.
- `02_constraints.sql` → claves primarias, foráneas y checks.
- `03_indexes.sql`   → índices sugeridos para consultas.
- `04_triggers.sql`  → triggers de negocio y auditoría.
- `05_comments.sql`  → comentarios de tabla y columnas.
- `06_seeds.sql`     → datos de semilla o pruebas.

## Comparacion con `precios_vinculantes_combustibles`

- `precios_vinculantes_combustibles` es el modelo operativo actual, con tabla base
  y vistas de reporte en `reporting.*`.
- `detalle_suministro_combustibles` define un modelo dimensional más clásico:
  una tabla de hechos (`fact_precio_vinculante`) y dimensiones (`dim_combustible`,
  `dim_region`).
- Ambos modelos comparten la misma información de negocio: precio de combustible,
  fuente, fecha y metadatos de carga, pero `detalle_suministro_combustibles`
  usa rango de vigencia y esquema de dimensiones en lugar de clave única por fecha.

Lógica del script
-----------------
- Tabla: `public.fact_precio_vinculante`
- Clave primaria: `id_precio_vinculante` (UUID generado automáticamente)
- Dimensiones referenciadas:
  - `public.dim_combustible`
  - `public.dim_region`
- Campos de vigencia:
  - `fecha_inicio_vigencia`
  - `fecha_fin_vigencia`
- Precio nominal:
  - `precio_vinculante` con precisión `NUMERIC(14,6)`
- Metadatos:
  - `moneda`, `fuente`, `documento_referencia`
  - `observaciones`, `archivo_origen`
  - `fecha_carga`, `usuario_carga`
- Control de estado:
  - `activo` booleano, por defecto `TRUE`
- Validación:
  - `CHECK (fecha_fin_vigencia >= fecha_inicio_vigencia)`

## Homologacion recomendada

1. Unificar el esquema de maestros.
   - Si el proyecto se queda en `datos_maestros`, mover o mapear `dim_combustible` y
     `dim_region` a esa capa.
2. Homologar nombres de columnas.
   - `activo` debe migrar a `es_activo` en desarrollos nuevos.
   - `precio_vinculante` y `precio_vinculante_combustibles` deben decidirse como
     nombre canonico unico.
3. Crear vistas de reporting si el modulo se conserva.
   - La capa de consumo debe vivir en `reporting`.
4. Revisar si este modelo sigue siendo necesario.
   - Si no aporta un caso de uso distinto, conviene retirarlo para evitar duplicidad.

Siguientes pasos
----------------
- Revisar si la tabla `fact_precio_vinculante` será la fuente principal de los reportes
  de precios vinculantes o si se debe mantener junto a `public.precios_vinculantes_combustibles`.
- Si se decide homologar totalmente, crear un conjunto paralelo de vistas en
  `supabase/reporting` para exponer este modelo de hechos a la capa de BI.
- Validar si `dim_region` y `dim_combustible` tienen datos equivalentes a los catálogos
  `datos_maestros.cat_*` usados por los reportes actuales.
