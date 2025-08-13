import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentralesService } from '../';
import { Central } from '../models/central.model';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-centrales-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './centrales-list.component.html',
  styleUrls: ['./centrales-list.component.css']
})
export class CentralesListComponent implements OnInit {
  private centralesService = inject(CentralesService);

  centrales: Central[] = [];
  displayedColumns = [
    'central_id', 'nombre', 'estado_operacion', 'tipo_central',
    'ubicacion_estado', 'ubicacion_municipio', 'capacidad_mw',
    'combustible_principal', 'combustible_secundario'
  ];
  loading = false;

  ngOnInit() {
    this.cargarCentrales();
  }

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
