import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './questions/question.model';
import { environment } from '../environments/environment';
import { Answer } from './answers/answer.interface';
import { Comment } from './comments/comment.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get<Question[]>(`${this.apiUrl}/api/v1/questions.json`);
  }

  getQuestion(id: string) {
    return this.http.get<Question>(
      `${this.apiUrl}/api/v1/questions/${id}.json`
    );
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
}
