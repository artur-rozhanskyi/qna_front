import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as QuestionActions from './store/question.actions';
import { Question } from './question.model';
import { QuestionSocketService } from '../cable/question-socket.service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  questions: Question[];
  errorMes: string;
  loading = false;
  isAuthenticated = false;

  onClick() {}

  constructor(
    private store: Store<fromApp.AppState>,
    private qSocket: QuestionSocketService
  ) {}

  ngOnInit(): void {
    this.qSocket.question$.subscribe();
    this.store.dispatch(QuestionActions.fetchQuestions());
    this.store.pipe(select('questions')).subscribe((questionState) => {
      this.questions = questionState.questions;
      this.errorMes = questionState.errorMessage;
      this.loading = questionState.loading;
    });
  }

  ngOnDestroy() {
    this.qSocket.unsubscribe();
  }
}
