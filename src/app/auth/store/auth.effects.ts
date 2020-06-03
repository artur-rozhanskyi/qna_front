import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
      exhaustMap((loginAction) =>
        this.authService.getToken(loginAction.auth).pipe(
          switchMap((token) =>
            of(AuthActions.authSuccess(), AuthActions.setToken({ token }))
          ),
          tap(() => this.router.navigate(['/'])),
          catchError(this.handleError)
        )
      )
    )
  );

  signUpStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpStart),
      exhaustMap((signUpAction) =>
        this.authService.signUp(signUpAction.auth).pipe(
          switchMap((user) =>
            of(
              AuthActions.setUser({ user }),
              AuthActions.loginStart({ auth: { ...signUpAction.auth } })
            )
          ),
          catchError(this.handleError)
        )
      )
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() =>
        this.authService
          .getUser()
          .pipe(
            switchMap((user) =>
              of(AuthActions.authSuccess(), AuthActions.setUser({ user }))
            )
          )
      )
    )
  );

  logoutStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutStart),
      exhaustMap(() => {
        localStorage.removeItem(this.tokenName);
        return of(AuthActions.authClear());
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
    const {
      errors: { ...errorObj },
    }: { errors?: { message?: string } } = errorRes.error;
    const errorMes = () => {
      if (errorObj) {
        if (errorObj.message) {
          return errorObj.message;
        }
        const capitalize = (s: string) => {
          if (typeof s !== 'string') return '';
          return s.charAt(0).toUpperCase() + s.slice(1);
        };
        let parameters = [];
        for (let prop in errorObj)
          parameters.push(`${capitalize(prop)} ${errorObj[prop]}`);
        return parameters.join('\n');
      }
    };
    return of(AuthActions.authFail({ error: errorMes() }));
  }

  private tokenName = environment.tokenName;

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}
}
