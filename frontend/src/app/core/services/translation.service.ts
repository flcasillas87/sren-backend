@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor() {
    // Inicialización de tu servicio
  }

  // Ejemplo de método para obtener traducciones
  translate(key: string): string {
    // Aquí podrías implementar tu lógica de traducción
    return key;
  }
}



import { Injectable } from '@angular/core';
