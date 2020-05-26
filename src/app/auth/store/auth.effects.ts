import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { exhaustMap, catchError, tap, switchMap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import * as AuthActions from '../store/auth.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      exhaustMap((loginAction) => {
        return this.authService
          .getToken({ email: loginAction.email, password: loginAction.password })
          .pipe(
            switchMap((user) => {
              return of(
                AuthActions.authSuccess(),
                AuthActions.setUser({ user })
              );
            }),
            catchError(this.handleError)
          );
      })
    )
  );

  setUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.setUser),
        tap((userAction) => {
          localStorage.setItem('user', JSON.stringify(userAction.user));
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logoutStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutStart),
      exhaustMap(() => {
        localStorage.removeItem('token');
        return of(AuthActions.authCleare());
      })
    )
  );

  signUpStart = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpStart),
      exhaustMap((signUpAction) => {
        return this.authService
          .signUp({
            email: signUpAction.email,
            password: signUpAction.password,
            password_confirmation: signUpAction.passwordConfirmation,
          })
          .pipe(
            switchMap((user) => {
              return of(
                AuthActions.authSuccess(),
                AuthActions.setUser({ user })
              );
            }),
            catchError(this.handleError)
          );
      })
    )
  );

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '';
    const errors = errorRes.error.errors;
    if(errors.user) {
      errorMessage = 'User does not exist';
    }
    if(errors.email) {
      errorMessage = 'Email already taken';
    }
    return of(AuthActions.authFail({ error: errorMessage }));
  }

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}
}
