import { Component, Input, inject } from '@angular/core';
import { Question } from '../question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question: Question;
  router = inject(Router)

  onShowQuestion() {
    this.router.navigate(['/questions', this.question.id]);
  }
}
