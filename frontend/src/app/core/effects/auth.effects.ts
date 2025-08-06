import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { setMessage } from '../actions/auth.actions';

@Injectable()
export class HelloEffects {
  constructor(private actions$: Actions) {}

  // Define un efecto para manejar la acción setMessage
  setMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setMessage), // Filtra las acciones para manejar solo la acción 'setMessage'
      delay(1000), // Simula un retraso de 1 segundo
      map((action) => {
        console.log('Mensaje establecido:', action.message);
        return action;
      })
    )
  );
}