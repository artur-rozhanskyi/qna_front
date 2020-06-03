import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take, map, skipWhile } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private store: Store<fromApp.AppState>) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select('auth'),
      skipWhile((authState) => authState.authenticated === null),
      map((authState) => !authState.authenticated),
      take(1)
    );
  }
}
