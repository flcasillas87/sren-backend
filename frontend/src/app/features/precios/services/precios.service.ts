@Injectable({ providedIn: 'root' })
export class PriceService {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });
  }

  private destroyRef = inject(DestroyRef);
  //Estado privado para los precios usando 
  private readonlyprivate readonlyprivate readonly _prices = signal<Price[]>([]);

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




import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { Price } from '../models/precios.model';
