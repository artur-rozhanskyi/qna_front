import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question.model';

import * as QuestionActions from '../store/question.actions';
import { Role } from 'src/app/shared/role';
import * as fromApp from '../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { AnswerSocketService } from '../../cable/answer-socket.service';
import { Answer } from 'src/app/answers/answer.interface';

@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.scss'],
})
export class QuestionShowComponent implements OnInit, OnDestroy {
  questionShow: Question;
  editLink: Array<string | number>;
  deleteAction;
  isOwner = false;
  Role = Role;
  isAuth: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private aSocket: AnswerSocketService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { question: Question }) => {
      this.questionShow = data.question;
      this.editLink = ['/questions', data.question.id, 'edit'];
      this.deleteAction = QuestionActions.questionDelete.bind(this, {
        question: data.question,
      });
    });

    this.aSocket.setQuestion(this.questionShow);
    this.aSocket.answer$.subscribe(
      (message: { answer: Answer; action: string }) => {
        switch (message.action) {
          case 'create':
            this.questionShow.answers.push(message.answer);
            break;
          case 'update':
            this.questionShow.answers.splice(
              this.questionShow.answers.findIndex(
                (answer) => answer.id === message.answer.id
              ),
              1,
              message.answer
            );
            break;
          case 'destroy':
            this.questionShow.answers.splice(
              this.questionShow.answers.findIndex(
                (answer) => answer.id === message.answer.id
              ),
              1
            );
            break;
        }
      }
    );

    this.store
      .pipe(select('auth'))
      .subscribe((authState) => (this.isAuth = authState.authenticated));
  }

  ngOnDestroy() {
    this.aSocket.unsubscribe(this.questionShow);
  }
}
