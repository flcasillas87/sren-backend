import { PrismaClient } from '@prisma/client';

// Crear una instancia de PrismaClient
const prisma = new PrismaClient({
  // Opcional: aquí puedes configurar el log para depuración
  log: ['query', 'info', 'warn', 'error'],
});

// Exportar la instancia para usarla en otros archivos
export default prisma;
