import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: { [key: string]: any } = {};

  constructor() { }

  // Métodos de la caché

  guardarEnCache(key: string, data: any): void {
    this.cache[key] = data;
  } 
  
  obtenerDeCache(key: string): any {
    return this.cache[key];
  }

  eliminarDeCache(key: string): void {
    delete this.cache[key];
  }

  vaciarCache(): void {
    this.cache = {};
  } 

  estaEnCache(key: string): boolean {
    return key in this.cache;
  } 

  obtenerTodasLasClavesDeCache(): string[] {
    return Object.keys(this.cache);
  } 

  obtenerTodosLosValoresDeCache(): any[] {
    return Object.values(this.cache);
  }
}
