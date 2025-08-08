# Explicación de Scripts del Proyecto

Este documento explica los scripts disponibles en el `package.json` del proyecto, su propósito y cuándo deben ejecutarse.

## Tabla de Contenidos
- [Scripts Principales](#scripts-principales)
- [Scripts de Calidad de Código](#scripts-de-calidad-de-código)
- [Scripts de Prisma](#scripts-de-prisma)
- [Scripts de Configuración](#scripts-de-configuración)
- [Flujo de Trabajo Recomendado](#flujo-de-trabajo-recomendado)

## Scripts Principales

### `dev`
```bash
npm run dev

Propósito: Inicia el servidor en modo desarrollo con:
Reinicio automático al detectar cambios (nodemon)
Ejecución directa de TypeScript (ts-node)
Soporte para módulos ES
Cuándo usarlo: Durante el desarrollo activo cuando necesitas ver cambios en tiempo real.

```bash
### `build`
bash
npm run build
Propósito: Compila el código TypeScript a JavaScript en la carpeta dist/.

Cuándo usarlo:

Antes de desplegar a producción

Para probar el código compilado localmente