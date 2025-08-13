import { createReducer, on } from '@ngrx/store';
import { setMessage, clearMessage } from '../../actions/auth.actions';

export interface HelloState {
  message: string;
}

export const initialState: HelloState = {
  message: '',
};

export const helloReducer = createReducer(
  initialState,
  on(setMessage, (state, { message }) => ({ ...state, message })),
  on(clearMessage, (state) => ({ ...state, message: '' }))
);
