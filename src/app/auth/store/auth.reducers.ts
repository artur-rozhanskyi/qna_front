import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { User } from 'src/app/shared/user.model';

export interface State {
  authenticated: boolean;
  error: string;
  loading: boolean;
  user: User;
}

const initialState: State = {
  authenticated: false,
  error: null,
  loading: false,
  user: null,
};

const authReducer$ = createReducer(
  initialState,
  on(AuthActions.loginStart, (state) => ({
    ...state,
    loading: true,
    authenticated: false,
    error: null,
  })),
  on(AuthActions.signUpStart, (state) => ({
    ...state,
    loading: true,
    authenticated: false,
    error: null,
  })),
  on(AuthActions.authSuccess, (state) => ({
    ...state,
    authenticated: true,
    loading: false,
    error: null,
  })),
  on(AuthActions.setUser, (state, payload) => ({
    ...state,
    user: payload.user,
  })),
  on(AuthActions.authFail, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    authenticated: false,
    user: null,
  })),
  on(AuthActions.authCleare, (state) => ({
    ...state,
    authenticated: false,
    user: null,
    loading: false,
    error: null,
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return authReducer$(state, action);
}
