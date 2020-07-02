import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as QuestionActions from './store/question.actions';
import { Question } from './question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Question[];
  errorMes: string;
  loading = false;
  isAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionActions.fetchQuestions());
    this.store.pipe(select('questions')).subscribe((questionState) => {
      this.questions = questionState.questions;
      this.errorMes = questionState.errorMessage;
      this.loading = questionState.loading;
    });
  }
}
