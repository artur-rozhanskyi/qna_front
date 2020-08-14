import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Question } from './questions/question.model';
import { environment } from '../environments/environment';
import { Answer } from './answers/answer.interface';
import { Comment } from './comments/comment.model';
import { Profile } from './shared/profile.model';
import { User } from './shared/user.model';
import * as AuthActions from './auth/store/auth.actions';
import * as fromApp from './store/app.reducers';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  getQuestions() {
    return this.http.get<Question[]>(`${this.apiUrl}/api/v1/questions.json`);
  }

  getQuestion(id: string) {
    return this.http.get<Question>(
      `${this.apiUrl}/api/v1/questions/${id}.json`
    );
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.apiUrl}/api/v1/users/${id}.json`);
  }

  createQuestion(questionForm: Question) {
    return this.http.post<Question>(`${this.apiUrl}/api/v1/questions.json`, {
      question: { ...questionForm },
    });
  }

  updateQuestion(question: Question) {
    return this.http.put<Question>(
      `${this.apiUrl}/api/v1/questions/${question.id}.json`,
      {
        question: { ...question },
      }
    );
  }

  deleteQuestion(question: Question) {
    return this.http.delete(
      `${this.apiUrl}/api/v1/questions/${question.id}.json`
    );
  }

  createAnswer(question: Question, answerForm: Answer) {
    return this.http.post(
      `${this.apiUrl}/api/v1/questions/${question.id}/answers.json`,
      {
        answer: { ...answerForm },
      }
    );
  }

  updateAnswer(answerForm: Answer) {
    return this.http.patch(
      `${this.apiUrl}/api/v1/answers/${answerForm.id}.json`,
      {
        answer: { ...answerForm },
      }
    );
  }

  deleteAnswer(answer: Answer) {
    return this.http.delete(`${this.apiUrl}/api/v1/answers/${answer.id}.json`);
  }

  createComment(
    comment,
    commenterString: string,
    commenter: Question | Answer
  ) {
    const requestObject = {
      comment: { ...comment },
    };
    requestObject[`${commenterString}_id`] = commenter.id;
    return this.http.post(`${this.apiUrl}/api/v1/comments.json`, requestObject);
  }

  updateComment(comment: Comment) {
    return this.http.patch(
      `${this.apiUrl}/api/v1/comments/${comment.id}.json`,
      comment
    );
  }

  deleteComment(comment: Comment) {
    return this.http.delete(
      `${this.apiUrl}/api/v1/comments/${comment.id}.json`
    );
  }
}
