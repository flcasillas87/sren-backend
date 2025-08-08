// src/models/User.ts

// Usualmente, aquí tendrías un esquema de Mongoose, un ORM o una interfaz.
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

// Simulación de una "base de datos" en memoria
export const users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Bob', email: 'bob@example.com', createdAt: new Date(), updatedAt: new Date() },
];
