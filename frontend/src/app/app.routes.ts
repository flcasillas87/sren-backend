import { Routes } from '@angular/router'; // Importa Routes para definir las rutas de la aplicación.
import { LayoutComponent } from './shared/components/layout/layout.component'; // Importa el componente Layout
import { PriceFormComponent } from './features/precios/componets/price-form/price-form.component'; // Importa el componente PriceFormComponent


// Define las rutas de la aplicación.
export const routes: Routes = [
  {
    path: '',
    component: PriceFormComponent, 
  },
  { 
    path: '**', 
    redirectTo: ''
  }, // Redirige cualquier ruta no encontrada a '/home'.
];