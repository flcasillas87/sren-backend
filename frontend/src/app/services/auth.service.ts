@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: revisar DestroyRef + effect en servicio singleton
  private destroyRef = inject(DestroyRef);
  constructor() {
    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });
}
}



import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
