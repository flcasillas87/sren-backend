drop view if exists public.vw_compras_cmd_seguimiento cascade;
drop view if exists public.vw_compras_anuales_totales cascade;
drop view if exists public.vw_compras_mensuales_totales cascade;
drop view if exists public.vw_compras_mensuales_detalle_diario cascade;
drop view if exists public.vw_compras_diarias cascade;
drop view if exists public.vw_compras_combustible cascade;
drop view if exists reporting.vw_compras_cmd_seguimiento cascade;
drop view if exists reporting.vw_compras_anuales_totales cascade;
drop view if exists reporting.vw_compras_mensuales_totales cascade;
drop view if exists reporting.vw_compras_mensuales_detalle_diario cascade;
drop view if exists reporting.vw_compras_diarias cascade;
drop view if exists reporting.vw_compras_combustible cascade;

create view reporting.vw_compras_combustible as
select
    c.id_compra_combustible,
    c.fecha_compra,
    prov.id_proveedor,
    prov.razon_social as proveedor,
    prov.rfc as rfc_proveedor,
    cg.id_central_generacion,
    cg.nombre_central as central_generacion,
    cg.capacidad_mw as cmd_referencia_mw,
    comb.id_combustible,
    comb.nombre_combustible as combustible,
    um.id_unidad_medida,
    um.descripcion as unidad_medida,
    c.documento_referencia,
    c.linea_documento,
    c.cantidad,
    c.precio_unitario,
    c.importe_total,
    c.moneda,
    c.fuente,
    c.observaciones,
    c.es_activo,
    c.created_at,
    c.updated_at,
    c.created_by,
    c.archivo_origen,
    c.fecha_carga,
    c.usuario_carga
from public.compras_combustible c
join datos_maestros.cat_proveedores prov
  on prov.id_proveedor = c.id_proveedor
join datos_maestros.cat_centrales_generacion cg
  on cg.id_central_generacion = c.id_central_generacion
join datos_maestros.cat_combustibles comb
  on comb.id_combustible = c.id_combustible
join datos_maestros.cat_unidades_medida um
  on um.id_unidad_medida = c.id_unidad_medida
where c.es_activo = true;

create view reporting.vw_compras_diarias as
select
    fecha_compra,
    id_proveedor,
    proveedor,
    rfc_proveedor,
    id_central_generacion,
    central_generacion,
    cmd_referencia_mw,
    id_combustible,
    combustible,
    id_unidad_medida,
    unidad_medida,
    moneda,
    count(*) as lineas_compra,
    sum(cantidad) as cantidad_total,
    sum(importe_total) as importe_total
from reporting.vw_compras_combustible
group by
    fecha_compra,
    id_proveedor,
    proveedor,
    rfc_proveedor,
    id_central_generacion,
    central_generacion,
    cmd_referencia_mw,
    id_combustible,
    combustible,
    id_unidad_medida,
    unidad_medida,
    moneda;

create view reporting.vw_compras_mensuales_detalle_diario as
select
    date_trunc('month', c.fecha_compra)::date as periodo_mensual,
    extract(year from c.fecha_compra)::int as anio,
    extract(month from c.fecha_compra)::int as mes,
    to_char(c.fecha_compra, 'YYYY-MM') as anio_mes,
    c.fecha_compra,
    c.id_proveedor,
    c.proveedor,
    c.rfc_proveedor,
    c.id_central_generacion,
    c.central_generacion,
    c.cmd_referencia_mw,
    c.id_combustible,
    c.combustible,
    c.id_unidad_medida,
    c.unidad_medida,
    c.moneda,
    c.lineas_compra,
    c.cantidad_total as cantidad_diaria,
    c.importe_total as importe_diario,
    sum(c.cantidad_total) over (
        partition by date_trunc('month', c.fecha_compra), c.id_central_generacion, c.id_combustible, c.id_unidad_medida, c.moneda
    ) as cantidad_total_mes,
    sum(c.importe_total) over (
        partition by date_trunc('month', c.fecha_compra), c.id_central_generacion, c.id_combustible, c.id_unidad_medida, c.moneda
    ) as importe_total_mes
from reporting.vw_compras_diarias c;

create view reporting.vw_compras_mensuales_totales as
select
    date_trunc('month', fecha_compra)::date as periodo_mensual,
    extract(year from fecha_compra)::int as anio,
    extract(month from fecha_compra)::int as mes,
    to_char(fecha_compra, 'YYYY-MM') as anio_mes,
    id_proveedor,
    proveedor,
    rfc_proveedor,
    id_central_generacion,
    central_generacion,
    cmd_referencia_mw,
    id_combustible,
    combustible,
    id_unidad_medida,
    unidad_medida,
    moneda,
    sum(lineas_compra) as lineas_compra,
    count(distinct fecha_compra) as dias_con_movimiento,
    sum(cantidad_total) as cantidad_total_mes,
    sum(importe_total) as importe_total_mes
from reporting.vw_compras_diarias
group by
    date_trunc('month', fecha_compra)::date,
    extract(year from fecha_compra)::int,
    extract(month from fecha_compra)::int,
    to_char(fecha_compra, 'YYYY-MM'),
    id_proveedor,
    proveedor,
    rfc_proveedor,
    id_central_generacion,
    central_generacion,
    cmd_referencia_mw,
    id_combustible,
    combustible,
    id_unidad_medida,
    unidad_medida,
    moneda;

create view reporting.vw_compras_anuales_totales as
select
    extract(year from fecha_compra)::int as anio,
    id_proveedor,
    proveedor,
    rfc_proveedor,
    id_central_generacion,
    central_generacion,
    cmd_referencia_mw,
    id_combustible,
    combustible,
    id_unidad_medida,
    unidad_medida,
    moneda,
    sum(lineas_compra) as lineas_compra,
    count(distinct date_trunc('month', fecha_compra)::date) as meses_con_movimiento,
    count(distinct fecha_compra) as dias_con_movimiento,
    sum(cantidad_total) as cantidad_total_anual,
    sum(importe_total) as importe_total_anual
from reporting.vw_compras_diarias
group by
    extract(year from fecha_compra)::int,
    id_proveedor,
    proveedor,
    rfc_proveedor,
    id_central_generacion,
    central_generacion,
    cmd_referencia_mw,
    id_combustible,
    combustible,
    id_unidad_medida,
    unidad_medida,
    moneda;

create view reporting.vw_compras_cmd_seguimiento as
with compras_diarias as (
    select
        date_trunc('month', fecha_compra)::date as periodo_mensual,
        fecha_compra,
        id_proveedor,
        proveedor,
        rfc_proveedor,
        id_central_generacion,
        central_generacion,
        cmd_referencia_mw,
        id_combustible,
        combustible,
        id_unidad_medida,
        unidad_medida,
        moneda,
        cantidad_total as cantidad_diaria,
        importe_total as importe_diario
    from reporting.vw_compras_diarias
)
select
    periodo_mensual,
    fecha_compra,
    id_proveedor,
    proveedor,
    rfc_proveedor,
    id_central_generacion,
    central_generacion,
    cmd_referencia_mw,
    id_combustible,
    combustible,
    id_unidad_medida,
    unidad_medida,
    moneda,
    cantidad_diaria,
    importe_diario,
    avg(cantidad_diaria) over (
        partition by periodo_mensual, id_central_generacion, id_combustible, id_unidad_medida, moneda
    ) as promedio_diario_cantidad_mes,
    round(
        avg(cantidad_diaria) over (
            partition by periodo_mensual, id_central_generacion, id_combustible, id_unidad_medida, moneda
        ) / nullif(cmd_referencia_mw, 0),
        4
    ) as factor_vs_cmd,
    round(
        (
            avg(cantidad_diaria) over (
                partition by periodo_mensual, id_central_generacion, id_combustible, id_unidad_medida, moneda
            ) / nullif(cmd_referencia_mw, 0)
        ) * 100,
        2
    ) as pct_cmd,
    case
        when avg(cantidad_diaria) over (
            partition by periodo_mensual, id_central_generacion, id_combustible, id_unidad_medida, moneda
        ) > cmd_referencia_mw then true
        else false
    end as excede_cmd
from compras_diarias;
