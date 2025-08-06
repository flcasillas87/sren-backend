import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';  // Importando RouterModule
import { FooterContentService } from '../../../core/services/layout.service';
import { FooterContent } from '../../../core/models/layout.model';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
  ],
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Creamos un signal con computed para manejar el contenido
  footerContent$ = this.footerContentService.getFooterContent();

  constructor(private footerContentService: FooterContentService) {
    // Aquí no es necesario el uso de `inject` para el servicio.
  }

}