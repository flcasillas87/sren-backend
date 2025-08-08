src/
├── index.ts              # Punto de entrada principal
├── config/
│   └── db.ts             # Configuración y conexión a la base de datos
├── routes/
│   ├── userRoutes.ts     # Rutas específicas para usuarios
│   └── index.ts          # Centraliza la exportación de todas las rutas
├── services/
│   └── userService.ts    # Lógica de negocio para usuarios
├── controllers/
│   └── userController.ts # Manejadores de solicitudes para rutas de usuario
└── models/
    └── User.ts           # Definición del modelo de datos para usuarios
