import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../answer.interface';
import { Role } from '../../shared/role';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer;
  Role = Role;

  constructor() { }

  ngOnInit(): void {
  }
}
