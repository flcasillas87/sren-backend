import { Injectable, signal, computed } from '@angular/core';
import { Price } from '../models/precios.model';
@Injectable({ providedIn: 'root' })
export class PriceService {
  //Estado privado para los precios usando Signal
  private readonly _prices = signal<Price[]>([]);

  // Obtener lista de precios (solo lectura)
  get prices() {
    return this._prices.asReadonly();
  }

  // Método para agregar precio
  addPrice(priceData: Omit<Price, 'id' | 'date'>): void {
    const newPrice: Price = {
      id: crypto.randomUUID(),
      date: new Date(),
      ...priceData,
    };

    this._prices.update((prices) => [...prices, newPrice]);
  }
}
