import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChildFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { inject } from '@angular/core';
import { take, map, skipWhile, tap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';

export const ProfileGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(Store<fromApp.AppState>).pipe(
    select('auth'),
    skipWhile((authState) => authState.authenticated === null),
    map((authState) => authState.authenticated),
    take(1)
  );
}
