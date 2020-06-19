import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { skipWhile, map, take, tap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import { QuestionsComponent } from '../questions.component';
import { QuestionShowComponent } from '../question-show/question-show.component';

@Injectable()
export class QuestionsGuard implements CanActivateChild {
 allowedComponent = [QuestionsComponent, QuestionShowComponent]

  constructor(private store: Store<fromApp.AppState>) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.allowedComponent.some((component)=> component === route.component)) {
      return true;
    }
    return this.store.pipe(
      select('auth'),
      skipWhile((authState) => authState.authenticated === null),
      map((authState) => authState.authenticated),
      take(1)
    );
  }
}
