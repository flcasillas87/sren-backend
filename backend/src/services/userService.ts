// src/services/userService.ts
import { User, users } from '../models/User';

/**
 * Obtiene todos los usuarios.
 * @returns Una promesa que resuelve con un array de usuarios.
 */
export async function getAllUsers(): Promise<User[]> {
    // Simula una operación asíncrona de base de datos
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(users);
        }, 100);
    });
}

/**
 * Obtiene un usuario por su ID.
 * @param id El ID del usuario.
 * @returns Una promesa que resuelve con el usuario encontrado o undefined.
 */
export async function getUserById(id: string): Promise<User | undefined> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(users.find(user => user.id === id));
        }, 50);
    });
}

/**
 * Crea un nuevo usuario.
 * @param name El nombre del usuario.
 * @param email El email del usuario.
 * @returns Una promesa que resuelve con el nuevo usuario.
 */
export async function createUser(name: string, email: string): Promise<User> {
    return new Promise(resolve => {
        setTimeout(() => {
            const newUser: User = {
                id: (users.length + 1).toString(),
                name,
                email,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            users.push(newUser); // Añadir a nuestra "base de datos" simulada
            resolve(newUser);
        }, 200);
    });
}
