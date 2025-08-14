@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-centrales-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './centrales-list.component.html',
  styleUrls: ['./centrales-list.component.css']
})
export class CentralesListComponent  {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
      centralesService;
    }, { inject: this.destroyRef });

    effect(() => {
      destroyRef;
      centralesService;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
      centralesService;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
      centralesService;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
      centralesService;
    }, { injector: this.destroyRef });
  }

  private destroyRef = inject(DestroyRef);
  private centralesService = inject(CentralesService);

  centrales: Central[] = [];
  displayedColumns = [
    'central_id', 'nombre', 'estado_operacion', 'tipo_central',
    'ubicacion_estado', 'ubicacion_municipio', 'capacidad_mw',
    'combustible_principal', 'combustible_secundario'
  ];
  loading = false;

  

  cargarCentrales() {
    this.loading = true;
    this.centralesService.listarCentrales().subscribe({
      next: (data) => {
        this.centrales = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando centrales:', err);
        this.loading = false;
      }
    });
  }
}








import { Central } from '../models/central.model';
import { CentralesService } from '../';
import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
