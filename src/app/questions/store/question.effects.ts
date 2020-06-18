import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as QuestionActions from './question.actions';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
            return of(QuestionActions.loadFail({ errorMessage }));
          })
        )
      )
    )
  );

  questionCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.questionCreate),
      exhaustMap((questionCreateAction) =>
        this.apiService.createQuestion(questionCreateAction.question).pipe(
          switchMap((question) =>
            of(QuestionActions.questionCreateSuccess({ question }))
          ),
          catchError((error) => this.handleError(error))
        )
      )
    )
  );

  questionCreateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(QuestionActions.questionCreateSuccess),
        tap((questionAction) =>
          this.router.navigate(['/questions', questionAction.question.id])
        )
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
    return of(QuestionActions.questionCreateFail({ error: errorMes(errors) }));
  }

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router
  ) {}
}
