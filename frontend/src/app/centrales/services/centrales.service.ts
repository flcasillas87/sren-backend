@Injectable({
  providedIn: 'root',
})
export class CentralesService {
  // TODO: revisar DestroyRef + effect en servicio singleton
  constructor() {
    effect(() => {
      destroyRef;
      http;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
      http;
    }, { injector: this.destroyRef });
  }

  private destroyRef = inject(DestroyRef);
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






import { Central } from '../core/models/central.model';
import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
