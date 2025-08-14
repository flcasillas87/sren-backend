@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // TODO: revisar DestroyRef + effect en servicio singleton
  private destroyRef = inject(DestroyRef);
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    effect(
      () => {
        destroyRef;
      },
      { injector: this.destroyRef },
    );

    effect(
      () => {
        destroyRef;
      },
      { injector: this.destroyRef },
    );
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  guardarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }
}






import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
