import { Component, OnInit } from '@angular/core';
import { Precio } from '../../features/precios/models/precios.model';
import { PreciosService } from '../../features/precios/services/precios.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export default class CardComponent {
  precios: Precio[] = [];
  constructor(private precioService: PreciosService) {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.precioService.getPrecio().subscribe((precios) => {
      this.precios = precios;
      console.log(precios);
    });
  }
}
