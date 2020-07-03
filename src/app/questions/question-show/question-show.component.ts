import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question.model';

import * as QuestionActions from '../store/question.actions';
import { Role } from 'src/app/shared/role';
import * as fromApp from '../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.scss'],
})
export class QuestionShowComponent implements OnInit {
  questionShow: Question;
  editLink: Array<string | number>;
  deleteAction;
  isOwner = false;
  Role = Role;
  isAuth;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { question: Question }) => {
      this.questionShow = data.question;
      this.editLink = ['/questions', data.question.id, 'edit'];
      this.deleteAction = QuestionActions.questionDelete.bind(this, {
        question: data.question,
      });
    });

    this.store
      .pipe(select('auth'))
      .subscribe((authState) => (this.isAuth = authState.authenticated));
  }
}
