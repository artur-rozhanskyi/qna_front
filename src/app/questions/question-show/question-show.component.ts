import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question.model';

import * as QuestionActions from '../store/question.actions';

@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.scss'],
})
export class QuestionShowComponent implements OnInit {
  questionShow: Question;
  editLink: Array<string | number>;
  deleteAction;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { question: Question }) => {
      this.questionShow = data.question;
      this.editLink = ['/questions', data.question.id, 'edit'];
      this.deleteAction = QuestionActions.questionDelete.bind(this, {
        question: data.question,
      });
    });
  }
}
