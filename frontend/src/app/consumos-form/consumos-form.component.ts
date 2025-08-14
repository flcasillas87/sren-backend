@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-consumos-form',
  imports: [
    
  ],
  templateUrl: './consumos-form.component.html',
  styleUrl: './consumos-form.component.css',
})
export class ConsumosFormComponent {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });
  }

  private destroyRef = inject(DestroyRef);}




import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, signal } from '@angular/core';
