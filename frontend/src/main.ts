/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './enviroments/environment';

async function main() {
  // Si NO estamos en producción, activar el mock service worker
  if (!environment.production) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // Ignora peticiones no mockeadas
    });
    console.log('Mock Service Worker iniciado');
  }

  // Arrancar la app Angular
  bootstrapApplication(AppComponent, appConfig)
    .then(() => console.log('Aplicación arrancada con éxito'))
    .catch((err) => console.error('Error al arrancar la aplicación:', err));
}

main();
