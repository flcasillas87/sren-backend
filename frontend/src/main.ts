/// <reference types="@angular/localize" />
// Esta línea referencia los tipos de @angular/localize, que se utilizan para la internacionalización (i18n) en Angular.

// Importaciones necesarias para arrancar la aplicación Angular
import { bootstrapApplication } from '@angular/platform-browser'; // Importa la función bootstrapApplication para arrancar la aplicación.
import { appConfig } from './app/app.config'; // Importa la configuración de la aplicación.
import { AppComponent } from './app/app.component'; // Importa el componente raíz de la aplicación.

// Arrancar la aplicación Angular con el componente raíz y la configuración
bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Aplicación arrancada con éxito'))
  .catch((err) => {
    console.error('Error al arrancar la aplicación:', err);
    // Manejo de errores adicional si es necesario
  });
