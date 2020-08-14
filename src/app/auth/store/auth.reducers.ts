import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { User } from 'src/app/shared/user.model';

export interface State {
  authenticated: boolean;
  error: string;
  loading: boolean;
  forgotPassword: boolean;
  resetPassword: boolean;
  user: User;
}

const initialState: State = {
  authenticated: null,
  error: null,
  loading: false,
  forgotPassword: false,
  resetPassword: false,
  user: null,
};

const authReducer$ = createReducer(
  initialState,
  on(AuthActions.authClear, (state) => ({
    ...state,
    authenticated: false,
    user: null,
    loading: false,
    error: null,
  })),
  on(AuthActions.authFail, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  })),
  on(AuthActions.authSuccess, (state) => ({
    ...state,
    authenticated: true,
    loading: false,
    error: null,
  })),
  on(AuthActions.errorClear, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.forgotPassword, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.forgotPasswordFalse, (state) => ({
    ...state,
    forgotPassword: false,
    loading: false,
  })),
  on(AuthActions.forgotPasswordSuccess, (state) => ({
    ...state,
    forgotPassword: true,
    loading: false,
  })),
  on(AuthActions.getUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginStart, (state) => ({
    ...state,
    loading: true,
    authenticated: false,
    error: null,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    authenticated: false,
    user: null,
    loading: false,
    error: null,
  })),
  on(AuthActions.resetPasswordFail, (state) => ({
    ...state,
    resetPassword: false,
  })),
  on(AuthActions.resetPasswordSuccess, (state) => ({
    ...state,
    resetPassword: true,
  })),
  on(AuthActions.setProfile, (state, payload) => ({
    ...state,
    user: { ...state.user, profile: payload.profile },
  })),
  on(AuthActions.setUser, (state, payload) => ({
    ...state,
    user: payload.user,
  })),
  on(AuthActions.signUpStart, (state) => ({
    ...state,
    loading: true,
    authenticated: false,
    error: null,
  }))
);

export function authReducer(state: State | undefined, action: Action) {
  return authReducer$(state, action);
}
