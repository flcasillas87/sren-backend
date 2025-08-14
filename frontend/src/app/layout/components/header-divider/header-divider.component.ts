@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-divider',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './header-divider.component.html',
  styleUrl: './header-divider.component.css',
})
export class HeaderDividerComponent {
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
