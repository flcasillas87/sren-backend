import { prisma } from '../prismaClient.js';

export async function crearCentral(nombre: string, ubicacion?: string) {
  return prisma.central.create({ data: { nombre, ubicacion } });
}

export async function crearConsumo(
  centralId: number,
  fecha: Date,
  valorGJ: number,
) {
  return prisma.consumo.create({
    data: { centralId, fecha, valorGJ },
  });
}

export async function listarCentrales() {
  return prisma.central.findMany();
}

export async function listarConsumos() {
  return prisma.consumo.findMany();
}
