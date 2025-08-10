// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  // 1. Configuración global
  {
  // Ignora los archivos de compilación y las dependencias
    ignores: ["dist/", "node_modules/"],
  },

  // 2. Configuración base de ESLint para archivos JavaScript
  js.configs.recommended,

  // 3. Configuraciones recomendadas para TypeScript
  // Usamos '...' para expandir los arrays de configuración que vienen del plugin
  ...tseslint.configs.recommended,

  // 4. Configuración para desactivar reglas que conflictúan con Prettier
  // ¡IMPORTANTE: Debe ir después de las otras configuraciones de reglas!
  prettierConfig,

  // 5. Configuración personalizada para tus archivos TypeScript del proyecto
  {
    files: ["src/**/*.ts"], // Aplica esta configuración solo a archivos .ts dentro de 'src'
    languageOptions: {
      globals: {
        ...globals.node, // Agrega todos los globales de Node.js
      },
      parserOptions: {
        // Indica a ESLint que use el tsconfig.json para reglas basadas en tipos
        project: true,
        // Directorio raíz para buscar el tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Aquí puedes añadir o sobrescribir reglas
      // Ejemplo: Requerir el uso de 'const' o 'let' en lugar de 'var'
      "no-var": "error",
      // Ejemplo: Advertir sobre el uso de 'any' en lugar de fallar
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];