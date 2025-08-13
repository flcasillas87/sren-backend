import { http, HttpResponse } from 'msw';
import { Central } from '../app/features/centrales/models/central.model';

const mockCentrales: Central[] = [
  {
    id: 1,
    nombre: 'Central Hidroeléctrica A',
    ubicacion: 'Chiapas',
    capacidadMW: 500,
    tipo: 'Hidráulica',
  },
  {
    id: 2,
    nombre: 'Central Solar B',
    ubicacion: 'Sonora',
    capacidadMW: 300,
    tipo: 'Solar',
  },
  {
    id: 3,
    nombre: 'Central Eólica C',
    ubicacion: 'Oaxaca',
    capacidadMW: 200,
    tipo: 'Eólica',
  },
];

export const centralesHandlers = [
  http.get('/api/centrales', () => {
    return HttpResponse.json(mockCentrales);
  }),
];
