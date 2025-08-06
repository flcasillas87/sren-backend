import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, FormsModule } from '@angular/forms';
// Importación de módulos de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { Price } from '../../models/precios.model';
import { PriceService } from '../../services/precios.service';


@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.css',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
  ],

})
export class PriceFormComponent {
  // Inyectar el servicio de precios
  private priceService = inject(PriceService);

  // Objeto temporal para el nuevo precio
  newPrice: Omit<Price, 'id' | 'date'> = {
    provider: '',
    value: 0,
    currency: 'MXN'
  };

    // Valida el formulario
    formValid(): boolean {
      return !!this.newPrice.provider?.trim() && this.newPrice.value > 0;
    }

  onSubmit() {
    if (this.isValidPrice()) {
      this.priceService.addPrice(this.newPrice);
      this.resetForm();
    }
  }
  private isValidPrice(): boolean {
    return this.newPrice.provider.trim().length > 0 && this.newPrice.value > 0;
  }

  private resetForm() {
    this.newPrice = {
      provider: '',
      value: 0,
      currency: 'MXN'
    };
  }

}