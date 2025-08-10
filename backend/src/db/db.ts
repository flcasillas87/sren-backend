// src/config/db.ts

/**
 * Simula la conexión a una base de datos.
 * En un proyecto real, aquí conectarías con MongoDB, PostgreSQL, MySQL, etc.
 */
export async function connectDB(): Promise<void> {
  console.log('🔗 Intentando conectar a la base de datos...');
  return new Promise((resolve, reject) => {
    // Simular un retraso y una conexión exitosa
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% de éxito
      if (success) {
        console.log('✅ Conexión a la base de datos establecida.');
        resolve();
      } else {
        console.error('❌ Fallo al conectar a la base de datos.');
        reject(new Error('No se pudo conectar a la base de datos.'));
      }
    }, 1500);
  });
}

// Opcional: una función para desconectar
export async function disconnectDB(): Promise<void> {
  console.log('🔌 Desconectando de la base de datos...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('✅ Desconexión de la base de datos completada.');
      resolve();
    }, 500);
  });
}
