import { ApplicationConfig } from '@angular/core'; // Importa ApplicationConfig para definir la configuración de la aplicación.
import { provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router'; // Importa funciones para configurar el enrutador.
import { routes } from './app.routes'; // Importa las rutas de la aplicación.
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importa la función para proporcionar animaciones de manera asíncrona.
import { firebaseProviders } from './firebase.config'; // Importa los proveedores de Firebase.

import { provideStore } from '@ngrx/store'; // Importa la función provideStore para proporcionar el almacenamiento de estado con NgRx.
import { reducers } from './app.state'; // Importa los reducers de NgRx.
import { provideEffects } from '@ngrx/effects'; // Importa la función provideEffects para proporcionar los efectos de NgRx.
import { HelloEffects } from './core/effects/auth.effects'; // Importa los efectos del módulo de autenticación.
import { provideStoreDevtools } from '@ngrx/store-devtools'; // Importa la función provideStoreDevtools para proporcionar las herramientas de desarrollo de NgRx.

export const appConfig: ApplicationConfig = {
  providers: [
    // Configura el enrutador con las rutas, transiciones de vista y enlace de entrada de componentes.
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),

    // Proporciona animaciones de manera asíncrona.
    provideAnimationsAsync(),

    // Proporciona los proveedores de Firebase.
    firebaseProviders,

    // Proporciona el cliente HTTP para realizar solicitudes HTTP.
    provideHttpClient(),

    //{ provide:priceService, useFactory:priceService },

    // Proporciona el almacenamiento de estado con NgRx.
    provideStore(reducers),

    // Proporciona los efectos de NgRx.
    provideEffects([HelloEffects]),

    // Proporciona las herramientas de desarrollo de NgRx.
    provideStoreDevtools(),
  ],
};
