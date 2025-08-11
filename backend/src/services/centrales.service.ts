import { prisma } from '../db/prismaClient.js';
import type { centrales } from '@prisma/client';



export async function crearCentral(
  nombre: string,
  ubicacion?: string,
): Promise<centrales> {
  if (!nombre?.trim()) {
    throw new Error('El nombre de la central es obligatorio');
  }

  try {
    const data: Partial<centrales> = { nombre };
    if (ubicacion?.trim()) {
      data.ubicacion = ubicacion;
    }

    return await prisma.centrales.create({ data });
  } catch (error) {
    console.error('Error creando central:', error);
    throw new Error('No se pudo crear la central');
  }
}

export async function listarCentrales() {
  return prisma.centrales.findMany();
}

export async function obtenerCentralPorId(id: number) {
  return prisma.centrales.findUnique({ where: { id } });
}
