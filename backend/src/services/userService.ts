// src/services/userService.ts
import { PrismaClient } from '@prisma/client';
import { saveUserLocally } from '../utils/fileStorage.js';

import { user } from '../models/user.js';

const prisma = new PrismaClient();
let users: user[] = [
  { id: 1, name: 'Juan', email: 'juan@test.com' },
  { id: 2, name: 'María', email: 'juan@test.com' },
];

export function getAllUsers(): user[] {
  return users;
}

export function getUserById(id: number): user | undefined {
  return users.find((user) => user.id === id);
}

export async function createUser(userData: { name: string; email: string }) {
  try {
    const user = await prisma.user.create({ data: userData });
    return { success: true, user };
  } catch (error) {
    console.error('Error DB, guardando localmente:', error);
    await saveUserLocally(userData);
    return { success: false, message: 'Guardado localmente por error de DB' };
  }
}

export function deleteUser(id: number): boolean {
  const initialLength = users.length;
  users = users.filter((user) => user.id !== id);
  return users.length < initialLength;
}
