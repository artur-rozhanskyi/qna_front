import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as QuestionActions from '../store/question.actions';
import * as fromApp from '../../store/app.reducers';
import { Question } from '../question.model';
import { Answer } from '../../answers/answer.interface';
import { Comment } from '../../comments/comment.model';
import { Role } from 'src/app/shared/role';
import { AnswerSocketService } from '../../cable/answer-socket.service';
import { CommentSocketService } from '../../cable/comment-socket.service';

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
  commenter = 'question';

  private workWithArray(arr: Array<Comment | Answer>, message: any) {
    switch (message.action) {
      case 'create':
        arr.push(message.object);
        break;
      case 'update':
        arr.splice(
          arr.findIndex((object) => object.id === message.object.id),
          1,
          message.object
        );
        break;
      case 'destroy':
        arr.splice(
          arr.findIndex((object) => object.id === message.object.id),
          1
        );
        break;
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private aSocket: AnswerSocketService,
    private cSocket: CommentSocketService
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
        this.workWithArray(this.questionShow.answers, {
          ...message,
          object: message.answer,
        });
      }
    );

    this.cSocket.comment$.subscribe(
      (message: { comment: Comment; action: string }) => {
        const mapping = { ...message, object: message.comment };
        switch (message.comment.commentableType.toLowerCase()) {
          case 'question':
            if (this.questionShow.id === message.comment.commentableId) {
              this.workWithArray(this.questionShow.comments, mapping);
            }
            break;
          case 'answer':
            const answer = this.questionShow.answers.find(
              (ans) => ans.id === message.comment.commentableId
            );
            if (answer) {
              this.workWithArray(answer.comments, mapping);
            }
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
    this.cSocket.unsubscribe();
  }
}
