@Injectable({ providedIn: 'root' })
export class LayoutService {
  // TODO: revisar DestroyRef + effect en servicio singleton
  private destroyRef = inject(DestroyRef);
  constructor(private snackBar: MatSnackBar) {
    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });
}

  show(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}




import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
