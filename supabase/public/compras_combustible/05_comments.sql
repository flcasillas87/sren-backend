-- =============================================================================
-- COMMENTS para compras_combustible
-- =============================================================================

comment on column public.compras_combustible.fecha_suministro is
    'Dia para el cual se compra o vende el combustible, aun si se ajusta meses despues.';
comment on column public.compras_combustible.numero_operacion_dia is
    'Secuencia para distinguir operaciones del mismo dia cuando no existe hora.';
comment on column public.compras_combustible.modalidad_mercado is
    'Modalidad de la operacion: MDA o INTRADAY.';
comment on column public.compras_combustible.sentido_operacion is
    'COMPRA o VENTA; reporting deriva la cantidad firmada sin almacenar negativos.';
comment on column public.compras_combustible_versiones.numero_version is
    'Secuencia inmutable; 1 es el valor original y las siguientes son ajustes.';
comment on column public.compras_combustible_versiones.fecha_registro is
    'Momento en que se conocio la version, distinto de la fecha de suministro.';
comment on column public.compras_combustible_versiones.precio_gas is
    'Precio unitario del energetico, sin incluir el servicio.';
comment on column public.compras_combustible_versiones.precio_servicio is
    'Precio unitario del servicio asociado a la cantidad absoluta.';
comment on column public.memoria_calculo_combustible.periodo_servicio is
    'Primer dia del mes que identifica el periodo de la memoria.';
comment on column public.memoria_calculo_combustible.poder_calorifico_mj_m3 is
    'Poder calorifico usado para convertir GJ a m3: GJ / (MJ/m3) * 1000.';
