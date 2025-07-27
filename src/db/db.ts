import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'testdb',
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 5
});