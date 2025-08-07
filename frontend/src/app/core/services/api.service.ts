import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
