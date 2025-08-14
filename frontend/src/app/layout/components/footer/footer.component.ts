import { RouterModule } from '@angular/router'; // Importando RouterModule



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // TODO: revisar DestroyRef + effect en servicio singleton
  private destroyRef = inject(DestroyRef);
  // Creamos un signal con computed para manejar el contenido
  footerContent$ = this.footerContentService.getFooterContent();

  constructor(private footerContentService: FooterContentService) {
    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    // Aquí no es necesario el uso de `inject` para el servicio.
  }
}










import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterContent } from '../../../core/models/layout.model';
import { FooterContentService } from '../../services/layout.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
