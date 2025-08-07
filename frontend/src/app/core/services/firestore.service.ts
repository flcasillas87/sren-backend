import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  getFirestore,
  enableMultiTabIndexedDbPersistence,
} from '@angular/fire/firestore';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore: Firestore;
  public persistenceEnabled: Promise<boolean>;

  constructor() {
    // Inicializar Firestore
    this.firestore = getFirestore();

    // Detectar si estamos en el navegador antes de habilitar persistencia
    const isBrowser = typeof window !== 'undefined';

    this.persistenceEnabled = isBrowser
      ? enableMultiTabIndexedDbPersistence(this.firestore)
          .then(() => {
            console.log('✅ Persistencia habilitada en Firestore');
            return true;
          })
          .catch((error) => {
            console.warn('⚠️ No se pudo habilitar persistencia:', error);
            return false;
          })
      : Promise.resolve(false);
  }

  /** Devuelve la instancia de Firestore */
  getFirestoreInstance(): Firestore {
    return this.firestore;
  }
}
