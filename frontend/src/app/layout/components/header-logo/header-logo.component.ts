@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-logo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './header-logo.component.html',
  styleUrl: './header-logo.component.css',
})
export class HeaderLogoComponent {
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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
