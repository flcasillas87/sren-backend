import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { tap, map, Observable, of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { PreciosService } from '../../../features/precios/services/precios.service';
import { Precio } from '../../../features/precios/models/precios.model';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  precio!: Precio[];
  private preciosService = inject(PreciosService);

  precios$ = this.preciosService
    .getPrecios()
    .pipe(tap((values) => console.log(values)));
}
