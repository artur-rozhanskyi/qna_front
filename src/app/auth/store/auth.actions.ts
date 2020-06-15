import { createAction, props } from '@ngrx/store';

import { Token } from 'src/app/shared/token.interface';
import { User } from 'src/app/shared/user.model';
import { AuthParams } from 'src/app/shared/auth.interface';

export const AUTH_CLEAR = '[Auth] Auth Clear';
export const AUTH_FAIL = '[Auth] Auth Fail';
export const AUTO_LOGIN = '[Auth] Auto Login ';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const ERROR_CLEAR = '[Auth] Error Clear';
export const FORGET_PASSWORD = '[Auth] Forget Password';
export const FORGET_PASSWORD_FALSE = '[Auth] Forget False';
export const FORGOT_PASSWORD_SUCCESS = '[Auth] Forgоt Password Success';
export const GET_USER = '[Auth] Get User';
export const LOGIN_START = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const RESET_PASSWORD = '[Auth] Reset Password ';
export const RESET_PASSWORD_SUCCESS = '[Auth] Reset Password Success';
export const RESET_PASSWORD_FAIL = '[Auth] Reset Password Fail';
export const SET_TOKEN = '[Auth] Set Token';
export const SET_USER = '[Auth] Set User';
export const SIGN_UP_START = '[Auth] Sign Up Start';

export const authClear = createAction(AUTH_CLEAR);
export const authFail = createAction(AUTH_FAIL, props<{ error: string }>());
export const autoLogin = createAction(AUTO_LOGIN);
export const authSuccess = createAction(AUTH_SUCCESS);
export const errorClear = createAction(ERROR_CLEAR);
export const forgotPassword = createAction(
  FORGET_PASSWORD,
  props<{ forgotParams: AuthParams }>()
);
export const forgotPasswordFalse = createAction(FORGET_PASSWORD_FALSE);
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);
export const getUser = createAction(GET_USER);
export const loginStart = createAction(
  LOGIN_START,
  props<{ auth: AuthParams }>()
);
export const logout = createAction(LOGOUT);
export const resetPassword = createAction(
  RESET_PASSWORD,
  props<{ resetParams: AuthParams }>()
);
export const resetPasswordFail = createAction(RESET_PASSWORD_FAIL);
export const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);
export const setToken = createAction(SET_TOKEN, props<{ token: Token }>());
export const setUser = createAction(SET_USER, props<{ user: User }>());
export const signUpStart = createAction(
  SIGN_UP_START,
  props<{ auth: AuthParams }>()
);
