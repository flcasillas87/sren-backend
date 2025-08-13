import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Central } from '../models/central.model';

@Injectable({ providedIn: 'root' })
export class CentralesService {
  private http = inject(HttpClient);
  private apiUrl = '/api/centrales'; // MSW intercepta esta ruta

  getCentrales(): Observable<Central[]> {
    return this.http.get<Central[]>(this.apiUrl);
  }
}
