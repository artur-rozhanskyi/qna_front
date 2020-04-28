import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as QuestionActions from './question.actions';
import { ApiService } from 'src/app/api.service';

@Injectable()
export class QuestionEffects {
  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.FETCH_QUESTIONS),
      switchMap(() =>
        this.apiService.getQuestions().pipe(
          map((questions) => QuestionActions.setQuestions({ questions })),
          catchError((errorRes) => {
            const errorMessage = 'An unknow error occur';
            return of(QuestionActions.loadFail({errorMessage}));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
