import { Component, OnInit, Input } from '@angular/core';
import { Answer } from './answer.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  @Input() answers: Answer[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  //   this.http
  //     .get<any>(`${environment.apiUrl}/api/v1/questions/1.json`)
  //     .subscribe((response) => {
  //       console.log(response);
  //       this.answers = response.answers;
  //     });
  }
}
