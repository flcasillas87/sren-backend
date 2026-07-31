create or replace view reporting.vw_compras_combustible as
select
    c.fecha_compra,
    prov.razon_social as proveedor,
    cg.nombre_central as central_generacion,
    comb.nombre_combustible as combustible,
    um.descripcion as unidad_medida,
    c.documento_referencia,
    c.linea_documento,
    c.cantidad,
    c.precio_unitario,
    c.importe_total,
    c.moneda,
    c.fuente,
    c.observaciones,
    c.archivo_origen,
    c.fecha_carga
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

create or replace view reporting.vw_compras_diarias as
select
    fecha_compra,
    central_generacion,
    combustible,
    sum(cantidad) as cantidad_total,
    sum(importe_total) as importe_total
from reporting.vw_compras_combustible
group by fecha_compra, central_generacion, combustible;

