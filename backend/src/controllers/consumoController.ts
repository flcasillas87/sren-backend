import { Request, Response } from 'express';
import * as consumoService from '../services/consumoService.js';

export async function agregarCentral(req: Request, res: Response) {
  try {
    const { nombre, ubicacion } = req.body;
    const central = await consumoService.crearCentral(nombre, ubicacion);
    res.status(201).json(central);
  } catch (error) {
    res.status(500).json({ error: 'Error creando central' });
  }
}

export async function agregarConsumo(req: Request, res: Response) {
  try {
    const { centralId, fecha, valorGJ } = req.body;
    const consumo = await consumoService.crearConsumo(
      centralId,
      new Date(fecha),
      valorGJ,
    );
    res.status(201).json(consumo);
  } catch (error) {
    res.status(500).json({ error: 'Error creando consumo' });
  }
}

export async function getCentrales(req: Request, res: Response) {
  const centrales = await consumoService.listarCentrales();
  res.json(centrales);
}

export async function getConsumos(req: Request, res: Response) {
  const consumos = await consumoService.listarConsumos();
  res.json(consumos);
}
