// src/services/__tests__/userService.test.ts

// Importamos los datos mock directamente
import { getAllUsers, getUserById, createUser } from '../userService';
import { users as mockUsers } from '../../models/User'; 

describe('userService', () => {

    // Antes de cada prueba, podemos reiniciar los datos si es necesario
    beforeEach(() => {
        // Podrías resetear un mock de base de datos aquí si lo tuvieras
        // Para este ejemplo simple, no es estrictamente necesario, ya que mockUsers es una constante
    });

    it('should return all users', async () => {
        const result = await getAllUsers();
        expect(result).toEqual(mockUsers); // Compara con nuestros datos mock
        expect(result.length).toBe(2);
    });

    it('should return a user by ID', async () => {
        const userId = '1';
        const result = await getUserById(userId);
        expect(result).toEqual(mockUsers[0]);
    });

    it('should return undefined if user ID does not exist', async () => {
        const userId = '999';
        const result = await getUserById(userId);
        expect(result).toBeUndefined();
    });

    it('should create a new user', async () => {
        const initialUsersLength = mockUsers.length;
        const newUser = await createUser('Charlie', 'charlie@example.com');

        expect(newUser).toBeDefined();
        expect(newUser.name).toBe('Charlie');
        expect(newUser.email).toBe('charlie@example.com');
        expect(mockUsers.length).toBe(initialUsersLength + 1); // Verifica que se añadió a nuestro mock de DB
        expect(mockUsers[mockUsers.length - 1]).toEqual(newUser); // El último usuario es el nuevo
    });
});