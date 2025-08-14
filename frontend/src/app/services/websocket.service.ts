import { computed, Injectable, signal } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly socketUrl = environment.socketUrl;
  private readonly socket$ = signal<WebSocketSubject<any> | null>(null);
  readonly conectado$ = computed(() => !!this.socket$());

  conectar(): void {
    const socket = new WebSocketSubject(this.socketUrl);
    this.socket$.set(socket);
  }

  enviarMensaje(mensaje: any): void {
    this.socket$()?.next(mensaje);
  }

  recibirMensajes(): Observable<any> {
    return this.socket$()?.asObservable() ?? EMPTY;
  }

  desconectar(): void {
    this.socket$()?.complete();
    this.socket$.set(null);
  }
}
