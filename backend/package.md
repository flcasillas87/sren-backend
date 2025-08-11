{
"name": "sren-backend", // Nombre del proyecto
"version": "1.0.0", // Versión actual
"description": "Un backend de ejemplo con Express y TypeScript", // Descripción
"type": "module", // Usa ES modules nativos (import/export)
"main": "dist/index.js", // Punto de entrada compilado
"scripts": {
"dev": "tsx watch src/index.ts", // Corre TS en modo desarrollo con recarga
"build": "tsc", // Compila TS a JS en dist/
"start": "node dist/index.js", // Ejecuta JS compilado
"test": "jest", // Corre tests con Jest
"lint": "eslint .", // Ejecuta ESLint para análisis de código
"format": "prettier --write .", // Formatea código con Prettier
"lint:fix": "eslint . --fix", // Arregla errores ESLint automáticamente
"prisma:generate": "prisma generate", // Genera cliente Prisma
"prisma:migrate": "prisma migrate dev", // Ejecuta migraciones en dev
"prisma:studio": "prisma studio", // Abre interfaz gráfica de Prisma
"prepare": "husky install" // Instala hooks de git con Husky
},
"keywords": [],
"author": "",
"license": "ISC",
"dependencies": {
"@prisma/client": "^6.12.0", // Cliente para base de datos Prisma
"cors": "^2.8.5", // Middleware para manejar CORS (cross-origin)
"discord.js": "^14.21.0", // SDK para interactuar con Discord
"dotenv": "^17.2.1", // Carga variables de entorno desde .env
"express": "^5.1.0", // Framework web para Node.js
"morgan": "^1.10.1", // Middleware para logs HTTP
"mysql2": "^3.14.2", // Driver MySQL para Node.js
"prisma": "^6.12.0", // Herramientas CLI para Prisma ORM
"winston": "^3.12.0", // Librería para logging avanzado
"zod": "^4.0.10" // Validación y parseo de datos con esquema
},
"devDependencies": {
"@types/cors": "^2.8.19", // Tipos para CORS
"@types/express": "^5.0.3", // Tipos para Express
"@types/morgan": "^1.9.10", // Tipos para Morgan
"@types/node": "^24.1.0", // Tipos para Node.js
"nodemon": "^3.1.10", // Recarga el servidor automáticamente (opcional)
"prettier": "^3.6.2", // Formateador de código
"ts-jest": "^29.1.2", // Adaptador para correr Jest con TS
"ts-node": "^10.9.2", // Ejecuta TS directamente (puede ser útil)
"tsx": "^4.20.3", // Ejecuta TS con soporte nativo ESM y recarga
"typescript": "^5.9.2", // Lenguaje TypeScript
"typescript-eslint": "^8.39.0" // Plugin ESLint para TS
}
}
