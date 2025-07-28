import { getAllUsers } from '../repositories/userRepository.js';

export async function fetchUsers() {
  return await getAllUsers();
}