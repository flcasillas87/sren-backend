// src/services/userService.ts
import { User } from '../models/User.js';

let users: User[] = [
  { id: 1, name: 'Juan', email: 'juan@test.com' },
  { id: 2, name: 'María',email: 'juan@test.com' }
];

export function getAllUsers(): User[] {
  return users;
}

export function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}

export function createUser(user: User): User {
  users.push(user);
  return user;
}

export function deleteUser(id: number): boolean {
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  return users.length < initialLength;
}
