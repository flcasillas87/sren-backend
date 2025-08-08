import { ActionReducerMap } from '@ngrx/store';
import { helloReducer, HelloState } from './core/reducers/auth.reducer';

export interface AppState {
  hello: HelloState;
}

export const reducers: ActionReducerMap<AppState> = {
  hello: helloReducer,
};
