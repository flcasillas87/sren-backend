import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormsModule,
} from '@angular/forms';
// Importación de módulos de Angular Material









@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
})
export class PriceFormComponent {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
      priceService;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
      priceService;
    }, { injector: this.destroyRef });
  }

  private destroyRef = inject(DestroyRef);
  // Inyectar el servicio de precios
  private priceService = inject(PriceService);

  // Objeto temporal para el nuevo precio
  newPrice: Omit<Price, 'id' | 'date'> = {
    provider: '',
    value: 0,
    currency: 'MXN',
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
      currency: 'MXN',
    };
  }
}













import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Price } from '../../models/precios.model';
import { PriceService } from '../../services/precios.service';
