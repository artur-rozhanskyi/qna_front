import { Component, OnInit, Input } from '@angular/core';
import { Answer } from './answer.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  @Input() answers: Answer[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
