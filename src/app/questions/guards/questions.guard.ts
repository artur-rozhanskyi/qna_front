import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChildFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { skipWhile, map, take, tap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import { QuestionsComponent } from '../questions.component';
import { QuestionShowComponent } from '../question-show/question-show.component';

export const QuestionsGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const allowedComponent = [QuestionsComponent, QuestionShowComponent];
  if (allowedComponent.some((component) => component === route.component)) {
    return true;
  }

  return inject(Store<fromApp.AppState>).pipe(
    select('auth'),
    skipWhile((authState) => authState.authenticated === null),
    map((authState) => authState.authenticated),
    take(1)
  );
}
