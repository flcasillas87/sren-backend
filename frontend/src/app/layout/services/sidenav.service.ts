@Injectable({
  providedIn: 'root',
})
export class SidenavService {
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
  private readonlyprivate readonly sidenavOpen = signal<boolean>(true);

  get sidenavOpen$() {
    return this.sidenavOpen;
  }

  toggleSidenav(): void {
    console.log('Toggling sidenav...');
    this.sidenavOpen.set(!this.sidenavOpen());
  }
}



import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
