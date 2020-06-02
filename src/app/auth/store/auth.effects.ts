import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, catchError, tap, switchMap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import * as AuthActions from '../store/auth.actions';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthEffects {
  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      exhaustMap((loginAction) => {
        return this.authService.getToken(loginAction.auth).pipe(
          switchMap((token) => {
            return of(
              AuthActions.authSuccess(),
              AuthActions.setToken({ token })
            );
          }),
          catchError(this.handleError)
        );
      })
    )
  );

  signUpStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpStart),
      exhaustMap((signUpAction) => {
        return this.authService.signUp(signUpAction.auth).pipe(
          switchMap(() => {
            return of(
              AuthActions.loginStart({ auth: { ...signUpAction.auth } })
            );
          }),
          catchError(this.handleError)
        );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() => {
        return this.authService.getUser().pipe(
          switchMap((user) => {
            return of(AuthActions.authSuccess(), AuthActions.setUser({ user }));
          })
        );
      })
    )
  );

  logoutStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutStart),
      exhaustMap(() => {
        localStorage.removeItem(this.tokenName);
        return of(AuthActions.authCleare());
      })
    )
  );

  setToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.setToken),
        tap((tokenAction) => {
          localStorage.setItem(this.tokenName, tokenAction.token.access_token);
          setInterval(
            () => localStorage.removeItem(this.tokenName),
            tokenAction.token.expires_in * 1000
          );
        })
      ),
    { dispatch: false }
  );

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = '';
    const errors = errorRes.error.errors;
    if (errors.message) {
      errorMessage = errors.message;
    }
    if (errors.email) {
      errorMessage = 'Email already taken';
    }
    return of(AuthActions.authFail({ error: errorMessage }));
  }

  private tokenName = environment.tokenName;

  constructor(private authService: AuthService, private actions$: Actions) {}
}
