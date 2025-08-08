module.exports = {
  // Indica que esta es la configuración raíz y no debe buscar más arriba
  root: true,

  // El parser que transformará TypeScript en un árbol que ESLint pueda entender
  parser: '@typescript-eslint/parser',

  // Plugins que estamos utilizando
  plugins: [
    '@typescript-eslint/eslint-plugin',
  ],

  // Configuraciones base que extendemos
  extends: [
    'eslint:recommended', // Reglas recomendadas por ESLint
    'plugin:@typescript-eslint/recommended', // Reglas recomendadas para TypeScript
  ],

  // Entorno de ejecución
  env: {
    node: true,  // Habilita variables globales de Node.js
    es2021: true, // Habilita características de ECMAScript 2021
  },

  // Opciones específicas del parser
  parserOptions: {
    project: './tsconfig.json', // Ruta a tu tsconfig, necesario para reglas con información de tipos
  },

  // Aquí puedes sobrescribir o añadir reglas específicas
  rules: {
    // Ejemplo: Requerir el uso de 'const' o 'let' en lugar de 'var'
    'no-var': 'error',
    // Ejemplo: Deshabilitar una regla si no te gusta
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};