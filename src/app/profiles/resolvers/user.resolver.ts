import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { UserResolved } from '../../shared/user.model';
import { ApiService } from '../../api.service';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {
  map, pluck, switchMap
} from 'rxjs/operators';

export const UserResolver: ResolveFn<UserResolved> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<UserResolved> | Promise<UserResolved> | UserResolved => {
  const apiService = inject(ApiService)

  return inject(Store<fromApp.AppState>).pipe(select('auth'), pluck('user'), switchMap((user) => {
    return +route.paramMap.get('id') === user.id
      ? of({ user: user, allowEdit: true })
      : apiService.getUser(route.paramMap.get('id')).pipe(
        map((userGet) => ({
          user: userGet,
          allowEdit: userGet.id === userGet.id,
        }))
      );
  }));
}

// catchError((error) => of({ user: undefined, error: error.statusText }))
// delay(1000),
// distinctUntilChanged((prevState, currState) => prevState === currState),
