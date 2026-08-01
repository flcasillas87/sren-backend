-- =============================================================================
-- SEED funcional de una operacion MDA, su version original y una memoria mensual.
-- Usa claves naturales; si los catalogos no existen, no inserta registros.
-- =============================================================================

with catalogos as (
    select
        p.id_proveedor,
        cg.id_central_generacion,
        cb.id_combustible,
        u.id_unidad_medida
    from datos_maestros.cat_proveedores p
    cross join datos_maestros.cat_centrales_generacion cg
    cross join datos_maestros.cat_combustibles cb
    join datos_maestros.cat_unidades_medida u
      on u.id_combustible = cb.id_combustible
    where upper(p.razon_social) = upper('CFE ENERGIA S.A. DE C.V.')
      and upper(cg.nombre_central) = upper('CTG Parque')
      and upper(cb.nombre_combustible) = upper('Diesel')
      and upper(u.codigo) = upper('Litro')
), operacion as (
    insert into public.compras_combustible (
        fecha_suministro, numero_operacion_dia, id_proveedor,
        id_central_generacion, id_combustible, id_unidad_medida,
        modalidad_mercado, sentido_operacion, moneda,
        documento_referencia, linea_documento, fuente,
        observaciones, archivo_origen
    )
    select
        current_date - 1, 1, id_proveedor,
        id_central_generacion, id_combustible, id_unidad_medida,
        'MDA', 'COMPRA', 'MXN',
        'TEST-SEED-001', 1, 'seed',
        'Operacion de prueba para validar el modulo.', '06_seeds.sql'
    from catalogos
    on conflict (
        fecha_suministro, id_proveedor, id_central_generacion,
        id_combustible, modalidad_mercado, numero_operacion_dia
    ) do update set observaciones = excluded.observaciones
    returning id_compra_combustible
)
insert into public.compras_combustible_versiones (
    id_compra_combustible, numero_version, cantidad,
    precio_gas, precio_servicio, tipo_version,
    motivo_actualizacion, archivo_origen
)
select id_compra_combustible, 1, 1000.0000,
       21.500000, 1.250000, 'ORIGINAL',
       'Valor inicial de prueba.', '06_seeds.sql'
from operacion
on conflict (id_compra_combustible, numero_version) do nothing;

insert into public.memoria_calculo_combustible (
    periodo_servicio, id_proveedor, id_central_generacion,
    id_combustible, moneda, tasa_iva, poder_calorifico_mj_m3,
    pedido, posicion, documento, observaciones
)
select
    date_trunc('month', current_date - 1)::date,
    p.id_proveedor, cg.id_central_generacion, cb.id_combustible,
    'MXN', 0.16, null, 'TEST-PEDIDO', '1', 'TEST-DOCUMENTO',
    'Memoria de prueba creada por 06_seeds.sql.'
from datos_maestros.cat_proveedores p
cross join datos_maestros.cat_centrales_generacion cg
cross join datos_maestros.cat_combustibles cb
where upper(p.razon_social) = upper('CFE ENERGIA S.A. DE C.V.')
  and upper(cg.nombre_central) = upper('CTG Parque')
  and upper(cb.nombre_combustible) = upper('Diesel')
on conflict (
    periodo_servicio, id_proveedor, id_central_generacion,
    id_combustible, moneda
) do update set tasa_iva = excluded.tasa_iva;
