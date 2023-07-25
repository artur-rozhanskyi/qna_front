import { Component, OnInit, Input, inject } from '@angular/core';
import { Answer } from './answer.interface';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent {
  @Input() answers: Answer[];
}
