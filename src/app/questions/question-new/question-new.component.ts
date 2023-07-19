import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as QuestionActions from '../store/question.actions';
import { Question } from '../question.model';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';

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
  isEdit = false;
  question: Question;
  backButtonPath = [];
  files: any;

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
        this.isEdit
          ? QuestionActions.questionUpdate({
              question: {
                id: this.question.id,
                body: this.question.body,
                title: this.question.title,
                ...this.questionNewForm.value,
                attachmentsAttributes: this.files,
              },
            })
          : QuestionActions.questionCreate({
              question: {
                ...this.questionNewForm.value,
                attachmentsAttributes: this.files,
              },
            })
      );
    } else {
      this.questionNewForm.markAllAsTouched();
    }
  }

  onBack() {
    this.router.navigate(this.backButtonPath);
  }

  onAddAttachment(files: any) {
    this.files = files;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select('questions'), withLatestFrom(this.activatedRoute.data))
      .subscribe(([questionsState, data]) => {
        this.errorMessage = questionsState.errorMessage;

        if (data.question) {
          this.question = data.question;
          this.questionNewForm.patchValue({ ...data.question });
          this.isEdit = !this.isEdit;
          this.backButtonPath = ['/questions', data.question.id];
        } else {
          this.backButtonPath = ['/questions'];
        }
      });
  }
}
