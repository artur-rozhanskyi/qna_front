import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;

  onShowQuestion() {
    this.router.navigate(['/questions', this.question.id]);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
