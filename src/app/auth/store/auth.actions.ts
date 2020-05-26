import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/shared/user.model';

export const LOGIN_START = '[Auth] Login Start';
export const LOGOUT_START = '[Auth] Logout Start';
export const SIGN_UP_START = '[Auth] Sign Up Start';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';
export const SET_USER = '[Auth] Set User';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_FAIL = '[Auth] Auth Fail';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGN_UP_FAIL = '[Auth] Sign Up Fail';
export const AUTH_CLEARE = '[Auth] Auth Clear';


export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const authSuccess = createAction(AUTH_SUCCESS);
export const authFail = createAction(AUTH_FAIL, props<{ error: string }>());
export const setUser = createAction(SET_USER, props<{ user: User }>());
export const logoutStart = createAction(LOGOUT_START);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const signUpStart = createAction(
  SIGN_UP_START,
  props<{ email: string, password: string, passwordConfirmation: string }>()
);
export const authCleare = createAction(AUTH_CLEARE);
