import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.scss'],
})
export class QuestionNewComponent implements OnInit {
  questionNewForm = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
  });
  errorMessage: string;

  get title() {
    return this.getControl('title');
  }

  get body() {
    return this.getControl('body');
  }

  private getControl(name: string): any {
    return this.questionNewForm.get(name);
  }

  onSubmit() {
    if (this.questionNewForm.valid) {
      this.store.dispatch(
        QuestionActions.questionCreate({ question: this.questionNewForm.value })
      );
    } else {
      this.questionNewForm.markAllAsTouched();
    }
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select('questions')).subscribe((questionsState) => {
      this.errorMessage = questionsState.errorMessage;
    });
  }
}
