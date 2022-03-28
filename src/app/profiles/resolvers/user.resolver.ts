import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { User, UserResolved } from '../../shared/user.model';
import { ApiService } from '../../api.service';
import { Observable, of, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import {
  take,
  pluck,
  exhaustMap,
  catchError,
  map,
  distinctUntilChanged,
  tap,
  delay,
  mapTo,
  withLatestFrom,
  first,
  switchMap,
  exhaust,
  mergeMap,
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserResolved> {
  constructor(
    private store: Store<fromApp.AppState>,
    private apiService: ApiService
  ) {
    this.subs = this.store
      .pipe(select('auth'), pluck('user'))
      .subscribe((user) => (this.user = user));
  }

  user: User;
  subs: Subscription;

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UserResolved | Observable<UserResolved> | Promise<UserResolved> {
    return +route.paramMap.get('id') === this.user.id
      ? of({ user: this.user, allowEdit: true })
      : this.apiService.getUser(route.paramMap.get('id')).pipe(
          map((userGet) => ({
            user: userGet,
            allowEdit: userGet.id === userGet.id,
          }))
        );
    // catchError((error) => of({ user: undefined, error: error.statusText }))
  }
}

// delay(1000),
//
// distinctUntilChanged((prevState, currState) => prevState === currState),
