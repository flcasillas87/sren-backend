// Para sincronización JSON -> DB
import { PrismaClient } from '@prisma/client';
import { getPendingUsers, clearPendingUsers } from '../utils/fileStorage.js';

const prisma = new PrismaClient();

export async function syncPendingUsers() {
  const pendingUsers = await getPendingUsers();
  if (pendingUsers.length === 0) return;

  try {
    for (const user of pendingUsers) {
      await prisma.user.create({ data: user });
    }
    await clearPendingUsers();
    console.log('Sincronización de usuarios pendiente completada.');
  } catch (error) {
    console.error('Error sincronizando usuarios:', error);
  }
}
