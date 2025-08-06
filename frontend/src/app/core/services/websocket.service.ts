import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../enviroments/environment';



@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socketUrl = environment.socketUrl;
  private socket$!: WebSocketSubject<any>;

  constructor() { }

  conectar(): void {
    this.socket$ = new WebSocketSubject(this.socketUrl);
  }

  enviarMensaje(mensaje: any): void {
    this.socket$.next(mensaje);
  } 

  recibirMensajes(): Observable<any> {
    return this.socket$.asObservable();
  } 

  desconectar(): void {
    this.socket$.complete();
  }

}
