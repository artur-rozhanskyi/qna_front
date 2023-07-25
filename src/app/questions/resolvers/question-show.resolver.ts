import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';
import { Question } from '../question.model';

export const QuestionShowResolver: ResolveFn<Question> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Question> | Promise<Question> | Question => {
  return inject(ApiService).getQuestion(route.paramMap.get('id'));
}
