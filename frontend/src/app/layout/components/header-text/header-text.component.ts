@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-text',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.css',
})
export class HeaderTextComponent {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
    }, { inject: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

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
