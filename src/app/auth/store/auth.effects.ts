import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  exhaustMap,
  catchError,
  tap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { AuthService } from '../auth.service';
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducers';
import { environment } from '../../../environments/environment';
import { Store, select } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      exhaustMap((loginAction) =>
        this.authService.getToken(loginAction.auth).pipe(
          withLatestFrom(this.store.pipe(select('auth'))),
          switchMap(([token, authState]) => {
            if (authState.user) {
              return of(
                AuthActions.setToken({ token }),
                AuthActions.authSuccess()
              );
            }
            return of(AuthActions.setToken({ token }), AuthActions.getUser());
          }),
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

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        this.authService.getUser().pipe(
          switchMap((user) =>
            of(AuthActions.setUser({ user }), AuthActions.authSuccess())
          ),
          catchError(this.handleError)
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem(environment.tokenName);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  setToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.setToken),
        tap((tokenAction) => {
          localStorage.setItem(
            environment.tokenName,
            tokenAction.token.accessToken
          );
          setInterval(
            () => localStorage.removeItem(environment.tokenName),
            tokenAction.token.expiresIn * 1000
          );
        })
      ),
    { dispatch: false }
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      exhaustMap((forgotAction) =>
        this.authService.forgotPassword(forgotAction.forgotParams).pipe(
          switchMap(() => of(AuthActions.forgotPasswordSuccess())),
          catchError(this.handleError)
        )
      )
    )
  );

  resetPasswordStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap((resetPasswordAction) =>
        this.authService.resetPassword(resetPasswordAction.resetParams).pipe(
          switchMap(() => of(AuthActions.resetPasswordSuccess())),
          catchError(this.handleError)
        )
      )
    )
  );

  resetPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.resetPasswordSuccess),
        tap(() => {
          localStorage.removeItem(environment.resetPasswordToken);
        })
      ),
    { dispatch: false }
  );

  private handleError(errorRes: HttpErrorResponse) {
    const {
      errors: { ...errors },
    }: { errors?: { message?: string } } = errorRes.error;
    const errorMes = (errorObj) => {
      if (errorObj) {
        if (errorObj.message) {
          return errorObj.message;
        }
        const capitalize = (s: string) => {
          if (typeof s !== 'string') {
            return '';
          }
          return s.charAt(0).toUpperCase() + s.slice(1);
        };
        const parameters = [];
        for (const prop in errorObj) {
          if (errorObj.hasOwnProperty(prop)) {
            parameters.push(
              `${capitalize(prop.split('_').join(' '))} ${errorObj[prop]}`
            );
          }
        }
        return parameters.join('\n');
      }
    };
    return of(AuthActions.authFail({ error: errorMes(errors) }));
  }

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
