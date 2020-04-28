import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as QuestionActions from './store/question.actions';
import { Question } from './question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  storeSub: Subscription;
  questions: Question[];
  errorMes: string;
  loading = false;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(QuestionActions.fetchQuestions());
    this.storeSub = this.store
      .pipe(select('questions'))
      .subscribe((questionState) => { 
        this.questions = questionState.questions;
        this.errorMes = questionState.errorMessage;
        this.loading = questionState.loading;
      });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
