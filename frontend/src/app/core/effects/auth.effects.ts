@Injectable()
export class HelloEffects {
  // TODO: revisar DestroyRef + effect en servicio singleton
  private destroyRef = inject(DestroyRef);
  constructor(private actions$: Actions) {
    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });

    effect(() => {
      destroyRef;
    }, { injector: this.destroyRef });
}

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







import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChangeDetectionStrategy, Component, computed, Computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { setMessage } from '../../actions/auth.actions';
