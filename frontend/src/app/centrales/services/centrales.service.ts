import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Central } from '../core/models/central.model';

@Injectable({
  providedIn: 'root',
})
export class CentralesService {
  private http = inject(HttpClient);
  private apiUrl = '/graphql';

  listarCentrales(): Observable<Central[]> {
    return this.http.post<Central[]>(this.apiUrl, {
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
    });
  }
}
