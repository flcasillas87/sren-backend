@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-card',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export default class CardComponent {
  precios: Precio[] = [];
  constructor(private precioService: PreciosService) {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add '' to the class.
    this.precioService.getPrecio().subscribe((precios) => {
      this.precios = precios;
      console.log(precios);
    });
  }
}






import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { Precio } from '../../features/precios/models/precios.model';
import { PreciosService } from '../../features/precios/services/precios.service';
