-- =============================================================================
-- VISTAS DE COMPRAS Y MEMORIA DE CALCULO DE COMBUSTIBLE
-- PostgreSQL 17 / Supabase: security_invoker conserva las politicas RLS.
-- =============================================================================

drop view if exists reporting.vw_memoria_calculo_resumen cascade;
drop view if exists reporting.vw_memoria_calculo_conceptos cascade;
drop view if exists reporting.vw_memoria_calculo_detalle_diario cascade;
drop view if exists reporting.vw_compras_diarias cascade;
drop view if exists reporting.vw_compras_ajustes cascade;
drop view if exists reporting.vw_compras_combustible cascade;
drop view if exists reporting.vw_compras_version_actual cascade;
drop view if exists reporting.vw_compras_version_original cascade;

create view reporting.vw_compras_version_original
with (security_invoker = true) as
select distinct on (v.id_compra_combustible)
    v.*
from public.compras_combustible_versiones v
order by v.id_compra_combustible, v.numero_version, v.fecha_registro,
         v.id_version_compra_combustible;

create view reporting.vw_compras_version_actual
with (security_invoker = true) as
select distinct on (v.id_compra_combustible)
    v.*
from public.compras_combustible_versiones v
order by v.id_compra_combustible, v.numero_version desc, v.fecha_registro desc,
         v.id_version_compra_combustible desc;

create view reporting.vw_compras_combustible
with (security_invoker = true) as
select
    c.id_compra_combustible,
    c.fecha_suministro,
    date_trunc('month', c.fecha_suministro)::date as periodo_servicio,
    c.numero_operacion_dia,
    c.modalidad_mercado,
    c.sentido_operacion,
    p.id_proveedor,
    p.razon_social as proveedor,
    p.rfc as rfc_proveedor,
    cg.id_central_generacion,
    cg.nombre_central as central_generacion,
    cb.id_combustible,
    cb.nombre_combustible as combustible,
    um.id_unidad_medida,
    um.codigo as unidad_medida,
    c.moneda,
    v.numero_version,
    v.tipo_version,
    v.fecha_registro,
    v.cantidad,
    case when c.sentido_operacion = 'VENTA' then -v.cantidad else v.cantidad end
        as cantidad_firmada,
    v.precio_gas,
    v.precio_servicio,
    round(
        (case when c.sentido_operacion = 'VENTA' then -v.cantidad else v.cantidad end)
        * v.precio_gas,
        2
    ) as importe_gas,
    round(abs(v.cantidad) * v.precio_servicio, 2) as importe_servicio,
    round(
        (case when c.sentido_operacion = 'VENTA' then -v.cantidad else v.cantidad end)
        * v.precio_gas
        + abs(v.cantidad) * v.precio_servicio,
        2
    ) as importe_total,
    c.documento_referencia,
    c.linea_documento,
    c.fuente,
    c.observaciones,
    c.archivo_origen,
    c.fecha_carga,
    c.usuario_carga
from public.compras_combustible c
join reporting.vw_compras_version_actual v
  on v.id_compra_combustible = c.id_compra_combustible
join datos_maestros.cat_proveedores p on p.id_proveedor = c.id_proveedor
join datos_maestros.cat_centrales_generacion cg
  on cg.id_central_generacion = c.id_central_generacion
join datos_maestros.cat_combustibles cb on cb.id_combustible = c.id_combustible
join datos_maestros.cat_unidades_medida um
  on um.id_unidad_medida = c.id_unidad_medida;

create view reporting.vw_compras_ajustes
with (security_invoker = true) as
select
    c.id_compra_combustible,
    c.fecha_suministro,
    date_trunc('month', c.fecha_suministro)::date as periodo_servicio,
    c.numero_operacion_dia,
    c.modalidad_mercado,
    c.sentido_operacion,
    c.id_proveedor,
    c.id_central_generacion,
    c.id_combustible,
    c.id_unidad_medida,
    c.moneda,
    o.cantidad as cantidad_original,
    a.cantidad as cantidad_actual,
    a.cantidad - o.cantidad as ajuste_cantidad,
    o.precio_gas as precio_gas_original,
    a.precio_gas as precio_gas_actual,
    a.precio_gas - o.precio_gas as ajuste_precio_gas,
    o.precio_servicio as precio_servicio_original,
    a.precio_servicio as precio_servicio_actual,
    a.precio_servicio - o.precio_servicio as ajuste_precio_servicio,
    round((case when c.sentido_operacion = 'VENTA' then -o.cantidad else o.cantidad end) * o.precio_gas, 2)
        as importe_gas_original,
    round((case when c.sentido_operacion = 'VENTA' then -a.cantidad else a.cantidad end) * a.precio_gas, 2)
        as importe_gas_actual,
    round(
        (case when c.sentido_operacion = 'VENTA' then -a.cantidad else a.cantidad end) * a.precio_gas
        - (case when c.sentido_operacion = 'VENTA' then -o.cantidad else o.cantidad end) * o.precio_gas,
        2
    ) as ajuste_importe_gas,
    round(abs(o.cantidad) * o.precio_servicio, 2) as importe_servicio_original,
    round(abs(a.cantidad) * a.precio_servicio, 2) as importe_servicio_actual,
    round(abs(a.cantidad) * a.precio_servicio - abs(o.cantidad) * o.precio_servicio, 2)
        as ajuste_importe_servicio,
    a.numero_version as version_actual,
    a.fecha_registro as fecha_ultimo_ajuste
from public.compras_combustible c
join reporting.vw_compras_version_original o
  on o.id_compra_combustible = c.id_compra_combustible
join reporting.vw_compras_version_actual a
  on a.id_compra_combustible = c.id_compra_combustible;

create view reporting.vw_compras_diarias
with (security_invoker = true) as
select
    fecha_suministro,
    periodo_servicio,
    id_proveedor,
    proveedor,
    rfc_proveedor,
    id_central_generacion,
    central_generacion,
    id_combustible,
    combustible,
    id_unidad_medida,
    unidad_medida,
    modalidad_mercado,
    moneda,
    count(*) as operaciones,
    sum(cantidad_firmada) as cantidad_neta,
    sum(abs(cantidad_firmada)) as cantidad_absoluta,
    round(sum(importe_gas), 2) as importe_gas,
    round(sum(importe_servicio), 2) as importe_servicio,
    round(sum(importe_total), 2) as importe_total,
    round(sum(importe_gas) / nullif(sum(cantidad_firmada), 0), 6)
        as precio_ponderado_gas,
    round(sum(importe_total) / nullif(sum(cantidad_firmada), 0), 6)
        as precio_ponderado_total
from reporting.vw_compras_combustible
group by fecha_suministro, periodo_servicio, id_proveedor, proveedor, rfc_proveedor,
         id_central_generacion, central_generacion, id_combustible, combustible,
         id_unidad_medida, unidad_medida, modalidad_mercado, moneda;

create view reporting.vw_memoria_calculo_detalle_diario
with (security_invoker = true) as
with dias as (
    select
        m.*,
        gs::date as fecha
    from public.memoria_calculo_combustible m
    cross join lateral generate_series(
        m.periodo_servicio::timestamp,
        (m.periodo_servicio + interval '1 month - 1 day')::timestamp,
        interval '1 day'
    ) gs
), diario as (
    select
        fecha_suministro,
        periodo_servicio,
        id_proveedor,
        id_central_generacion,
        id_combustible,
        moneda,
        sum(cantidad_neta) filter (where modalidad_mercado = 'MDA') as cantidad_mda,
        sum(importe_gas) filter (where modalidad_mercado = 'MDA') as importe_gas_mda,
        sum(importe_servicio) filter (where modalidad_mercado = 'MDA') as importe_servicio_mda,
        sum(cantidad_neta) filter (where modalidad_mercado = 'INTRADAY') as cantidad_intraday,
        sum(importe_gas) filter (where modalidad_mercado = 'INTRADAY') as importe_gas_intraday,
        sum(importe_servicio) filter (where modalidad_mercado = 'INTRADAY') as importe_servicio_intraday
    from reporting.vw_compras_diarias
    group by fecha_suministro, periodo_servicio, id_proveedor, id_central_generacion,
             id_combustible, moneda
)
select
    d.id_memoria_calculo_combustible,
    d.periodo_servicio,
    d.fecha,
    d.id_proveedor,
    d.id_central_generacion,
    d.id_combustible,
    d.moneda,
    coalesce(x.cantidad_mda, 0) as cantidad_mda,
    coalesce(x.cantidad_intraday, 0) as cantidad_intraday,
    coalesce(x.cantidad_mda, 0) + coalesce(x.cantidad_intraday, 0) as cantidad_neta,
    coalesce(x.importe_gas_mda, 0) as importe_gas_mda,
    coalesce(x.importe_gas_intraday, 0) as importe_gas_intraday,
    coalesce(x.importe_gas_mda, 0) + coalesce(x.importe_gas_intraday, 0) as importe_gas,
    coalesce(x.importe_servicio_mda, 0) as importe_servicio_mda,
    coalesce(x.importe_servicio_intraday, 0) as importe_servicio_intraday,
    coalesce(x.importe_servicio_mda, 0) + coalesce(x.importe_servicio_intraday, 0)
        as importe_servicio,
    round(
        (coalesce(x.importe_gas_mda, 0) + coalesce(x.importe_gas_intraday, 0))
        / nullif(coalesce(x.cantidad_mda, 0) + coalesce(x.cantidad_intraday, 0), 0),
        6
    ) as precio_ponderado_gas
from dias d
left join diario x
  on x.fecha_suministro = d.fecha
 and x.periodo_servicio = d.periodo_servicio
 and x.id_proveedor = d.id_proveedor
 and x.id_central_generacion = d.id_central_generacion
 and x.id_combustible = d.id_combustible
 and x.moneda = d.moneda;

create view reporting.vw_memoria_calculo_conceptos
with (security_invoker = true) as
with importes as (
    select
        m.id_memoria_calculo_combustible,
        m.periodo_servicio,
        m.id_proveedor,
        m.id_central_generacion,
        m.id_combustible,
        m.moneda,
        m.tasa_iva,
        coalesce(sum(a.importe_gas_original) filter (where a.modalidad_mercado = 'MDA'), 0) as gas_mda,
        coalesce(sum(a.importe_servicio_original) filter (where a.modalidad_mercado = 'MDA'), 0) as servicio_mda,
        coalesce(sum(a.importe_gas_original) filter (where a.modalidad_mercado = 'INTRADAY'), 0) as gas_intraday,
        coalesce(sum(a.importe_servicio_original) filter (where a.modalidad_mercado = 'INTRADAY'), 0) as servicio_intraday,
        coalesce(sum(a.ajuste_importe_gas) filter (where a.modalidad_mercado = 'MDA'), 0) as ajuste_gas_mda,
        coalesce(sum(a.ajuste_importe_servicio) filter (where a.modalidad_mercado = 'MDA'), 0) as ajuste_servicio_mda,
        coalesce(sum(a.ajuste_importe_gas) filter (where a.modalidad_mercado = 'INTRADAY'), 0) as ajuste_gas_intraday,
        coalesce(sum(a.ajuste_importe_servicio) filter (where a.modalidad_mercado = 'INTRADAY'), 0) as ajuste_servicio_intraday
    from public.memoria_calculo_combustible m
    left join reporting.vw_compras_ajustes a
      on a.periodo_servicio = m.periodo_servicio
     and a.id_proveedor = m.id_proveedor
     and a.id_central_generacion = m.id_central_generacion
     and a.id_combustible = m.id_combustible
     and a.moneda = m.moneda
    group by m.id_memoria_calculo_combustible, m.periodo_servicio,
             m.id_proveedor, m.id_central_generacion, m.id_combustible,
             m.moneda, m.tasa_iva
), conceptos as (
    select i.*, v.orden, v.concepto, v.subtotal
    from importes i
    cross join lateral (values
        (1, 'Suministro de Gas (MDA)'::text, i.gas_mda),
        (2, 'Costo por servicio (MDA)'::text, i.servicio_mda),
        (3, 'Suministro de Gas (INTRADAY)'::text, i.gas_intraday),
        (4, 'Costo por servicio (INTRADAY)'::text, i.servicio_intraday),
        (5, 'Ajuste en Suministro de Gas (MDA)'::text, i.ajuste_gas_mda),
        (6, 'Ajuste en Costo por servicio (MDA)'::text, i.ajuste_servicio_mda),
        (7, 'Ajuste en Suministro de Gas (INTRADAY)'::text, i.ajuste_gas_intraday),
        (8, 'Ajuste en Costo por servicio (INTRADAY)'::text, i.ajuste_servicio_intraday)
    ) v(orden, concepto, subtotal)
)
select
    id_memoria_calculo_combustible,
    periodo_servicio,
    id_proveedor,
    id_central_generacion,
    id_combustible,
    moneda,
    orden,
    concepto,
    round(subtotal, 2) as subtotal,
    round(subtotal * tasa_iva, 2) as iva,
    round(subtotal * (1 + tasa_iva), 2) as total
from conceptos;

create view reporting.vw_memoria_calculo_resumen
with (security_invoker = true) as
with totales_conceptos as (
    select
        id_memoria_calculo_combustible,
        round(sum(subtotal), 2) as subtotal,
        round(sum(iva), 2) as iva,
        round(sum(total), 2) as total
    from reporting.vw_memoria_calculo_conceptos
    group by id_memoria_calculo_combustible
), totales_diarios as (
    select
        id_memoria_calculo_combustible,
        sum(cantidad_mda) as cantidad_mda,
        sum(cantidad_intraday) as cantidad_intraday,
        sum(cantidad_neta) as cantidad_neta,
        round(sum(importe_gas), 2) as importe_gas,
        round(sum(importe_servicio), 2) as importe_servicio
    from reporting.vw_memoria_calculo_detalle_diario
    group by id_memoria_calculo_combustible
)
select
    m.id_memoria_calculo_combustible,
    m.periodo_servicio,
    p.razon_social as proveedor,
    p.rfc as rfc_proveedor,
    cg.nombre_central as central_generacion,
    cb.nombre_combustible as combustible,
    m.moneda,
    m.tasa_iva,
    m.poder_calorifico_mj_m3,
    m.pedido,
    m.posicion,
    m.documento,
    m.elaboro,
    m.puesto_elaboro,
    m.reviso,
    m.puesto_reviso,
    c.subtotal,
    c.iva,
    c.total,
    d.cantidad_mda,
    d.cantidad_intraday,
    d.cantidad_neta,
    d.importe_gas,
    d.importe_servicio,
    round(d.importe_gas / nullif(d.cantidad_neta, 0), 6)
        as precio_ponderado_gas,
    round(
        d.cantidad_neta / nullif(m.poder_calorifico_mj_m3, 0) * 1000,
        6
    ) as volumen_m3
from public.memoria_calculo_combustible m
join datos_maestros.cat_proveedores p on p.id_proveedor = m.id_proveedor
join datos_maestros.cat_centrales_generacion cg
  on cg.id_central_generacion = m.id_central_generacion
join datos_maestros.cat_combustibles cb on cb.id_combustible = m.id_combustible
join totales_conceptos c
  on c.id_memoria_calculo_combustible = m.id_memoria_calculo_combustible
join totales_diarios d
  on d.id_memoria_calculo_combustible = m.id_memoria_calculo_combustible
;
