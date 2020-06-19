import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './questions/question.model';
import { environment } from '../environments/environment';

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
}
