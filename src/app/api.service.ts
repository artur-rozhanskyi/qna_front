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
}
