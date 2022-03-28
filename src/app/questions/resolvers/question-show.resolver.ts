import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';
import { Question } from '../question.model';

@Injectable({ providedIn: 'root' })
export class QuestionShowResolver implements Resolve<Question> {
  constructor(private api: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Question> | Promise<Question> | Question {
    return this.api.getQuestion(route.paramMap.get('id'));
  }
}
