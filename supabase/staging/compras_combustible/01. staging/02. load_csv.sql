-- =============================================================================
-- LOAD CSV para compras_combustible
-- Reemplazar la ruta y conservar un mismo batch_id para toda la corrida.
-- =============================================================================

drop table if exists staging.compras_combustible_raw;

create table staging.compras_combustible_raw (
    fecha_suministro text,
    numero_operacion_dia text,
    rfc_proveedor text,
    nombre_proveedor text,
    nombre_central text,
    nombre_combustible text,
    nombre_unidad_medida text,
    modalidad_mercado text,
    sentido_operacion text,
    cantidad text,
    precio_gas text,
    precio_servicio text,
    moneda text,
    tipo_version text,
    fecha_registro text,
    motivo_actualizacion text,
    documento_referencia text,
    linea_documento text,
    fuente text,
    observaciones text,
    archivo_origen text
);

\copy staging.compras_combustible_raw from 'C:/ruta/compras_combustible_rows.csv'
with (format csv, header true, encoding 'UTF8');

do $$
declare
    v_batch_id uuid := gen_random_uuid();
begin
    insert into staging.stg_compras_combustible (
        batch_id,
        fecha_suministro,
        numero_operacion_dia,
        rfc_proveedor,
        nombre_proveedor,
        nombre_central,
        nombre_combustible,
        nombre_unidad_medida,
        modalidad_mercado,
        sentido_operacion,
        cantidad,
        precio_gas,
        precio_servicio,
        moneda,
        tipo_version,
        fecha_registro,
        motivo_actualizacion,
        documento_referencia,
        linea_documento,
        fuente,
        observaciones,
        archivo_origen
    )
    select
        v_batch_id,
        fecha_suministro,
        numero_operacion_dia,
        rfc_proveedor,
        nombre_proveedor,
        nombre_central,
        nombre_combustible,
        nombre_unidad_medida,
        modalidad_mercado,
        sentido_operacion,
        cantidad,
        precio_gas,
        precio_servicio,
        moneda,
        tipo_version,
        fecha_registro,
        motivo_actualizacion,
        documento_referencia,
        linea_documento,
        fuente,
        observaciones,
        coalesce(nullif(archivo_origen, ''), 'compras_combustible_rows.csv')
    from staging.compras_combustible_raw;

    call etl.pr_load_compras_combustible(v_batch_id);
end;
$$;

drop table if exists staging.compras_combustible_raw;
