import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { centralesHandlers } from './centrales.handlers';

// Configura el service worker para interceptar peticiones
export const worker = setupWorker(...centralesHandlers);
