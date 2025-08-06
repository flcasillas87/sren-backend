import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal, computed } from '@angular/core';

export const consumptionService = () => {
  const http = inject(HttpClient);
  const consumptions = signal<Consumption[]>([]);

  return {
    consumptions,
    addConsumption: (consumption: Omit<Consumption, 'id'>) => {
      const newConsumption = { ...consumption, id: crypto.randomUUID() };
      consumptions.update(current => [...current, newConsumption]);
      return http.post('/api/consumptions', newConsumption);
    }
  };
};
