import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-centrales',
  templateUrl: './centrales.html',
  styleUrls: ['./centrales.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Agrega aquí módulos standalone que necesites, ej: CommonModule
  ],
})
export class Centrales {}
