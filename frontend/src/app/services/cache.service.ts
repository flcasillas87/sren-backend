@Injectable({
  providedIn: 'root',
})
export class CacheService {
  // Señal que guarda la caché
  private readonly cache = signal<{ [key: string]: any }>({});

  // Computed para obtener la caché completa de forma reactiva
  readonly cache$ = computed(() => this.cache());

  /** Guardar un valor en la caché */
  guardarEnCache(key: string, data: any): void {
    this.cache.update(c => ({ ...c, [key]: data }));
  }

  /** Obtener un valor de la caché */
  obtenerDeCache(key: string): any {
    return this.cache()[key];
  }

  /** Eliminar un valor de la caché */
  eliminarDeCache(key: string): void {
    const c = { ...this.cache() };
    delete c[key];
    this.cache.set(c);
  }

  /** Vaciar toda la caché */
  vaciarCache(): void {
    this.cache.set({});
  }

  /** Verificar si una clave está en la caché */
  estaEnCache(key: string): boolean {
    return key in this.cache();
  }

  /** Obtener todas las claves de la caché */
  obtenerTodasLasClavesDeCache(): string[] {
    return Object.keys(this.cache());
  }

  /** Obtener todos los valores de la caché */
  obtenerTodosLosValoresDeCache(): any[] {
    return Object.values(this.cache());
  }
}



import { computed, Injectable, signal } from '@angular/core';
