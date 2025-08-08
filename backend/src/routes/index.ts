// src/routes/index.ts
import { Application } from 'express';
import userRoutes from './userRoutes';

// Función para registrar todas las rutas en la aplicación Express
export function registerRoutes(app: Application): void {
    app.use('/users', userRoutes);
    // Aquí podrías agregar más rutas:
    // app.use('/products', productRoutes);
    // app.use('/orders', orderRoutes);
}
