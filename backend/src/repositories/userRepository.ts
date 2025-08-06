import { db } from '../db/mysqlConection.js';

export async function getAllUsers() {
  const [rows] = await db.query('SELECT id, name, email FROM users');
  return rows;
}
