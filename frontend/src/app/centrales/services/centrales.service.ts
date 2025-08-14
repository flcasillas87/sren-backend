import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

export type Central = {
  central_id: string;
  nombre: string;
  ubicacion_estado: string;
  ubicacion_municipio: string;
  tipo_central: string;
  estado_operacion: string;
  capacidad_mw: number;
  combustible_principal: string;
  combustible_secundario: string;
};

@Injectable({
  providedIn: 'root',
})
export class CentralesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/graphql';

  // Señal reactiva que contiene las centrales
  readonly centrales = signal<Central[]>([]);

  listarCentrales(): void {
    this.http
      .post<{ data: { centrales: Central[] } }>(this.apiUrl, {
        query: `
        query GetCentrales {
          centrales {
            central_id
            nombre
            ubicacion_estado
            ubicacion_municipio
            tipo_central
            estado_operacion
            capacidad_mw
            combustible_principal
            combustible_secundario
          }
        }
      `,
      })
      .pipe(
        map(res => res.data.centrales),
        tap(data => this.centrales.set(data)) // Actualiza la señal
      )
      .subscribe();
  }
}
