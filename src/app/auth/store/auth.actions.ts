import { createAction, props } from '@ngrx/store';

import { Token } from 'src/app/shared/token.interface';
import { User } from 'src/app/shared/user.model';
import { AuthParams } from 'src/app/shared/auth.interface';

export const LOGIN_START = '[Auth] Login Start';
export const LOGOUT_START = '[Auth] Logout Start';
export const SIGN_UP_START = '[Auth] Sign Up Start';
export const LOGOUT_SUCCESS = '[Auth] Logout Success';
export const SET_TOKEN = '[Auth] Set Token';
export const SET_USER = '[Auth] Set User';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_FAIL = '[Auth] Auth Fail';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGN_UP_FAIL = '[Auth] Sign Up Fail';
export const AUTH_CLEARE = '[Auth] Auth Clear';
export const AUTO_LOGIN = '[Auth] Auto Login';

export const loginStart = createAction(
  LOGIN_START,
  props<{ auth: AuthParams }>()
);
export const authSuccess = createAction(AUTH_SUCCESS);
export const authFail = createAction(AUTH_FAIL, props<{ error: string }>());
export const setToken = createAction(SET_TOKEN, props<{ token: Token }>());
export const setUser = createAction(SET_USER, props<{ user: User }>());
export const logoutStart = createAction(LOGOUT_START);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const signUpStart = createAction(
  SIGN_UP_START,
  props<{ auth: AuthParams }>()
);
export const autoLogin = createAction(AUTO_LOGIN);
export const authCleare = createAction(AUTH_CLEARE);
