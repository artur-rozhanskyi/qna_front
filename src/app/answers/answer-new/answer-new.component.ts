import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/questions/question.model';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-answer-new',
  templateUrl: './answer-new.component.html',
  styleUrls: ['./answer-new.component.scss'],
})
export class AnswerNewComponent implements OnInit {
  answerForm = this.fb.group({ body: ['', [Validators.required]] });
  question: Question;

  onSubmit() {
    if (this.answerForm.valid) {
      this.api.createAnswer(this.question, this.answerForm.value).subscribe();
      this.answerForm.patchValue({ body: '' });
      this.answerForm.markAsUntouched();
    }
  }

  get body() {
    return this.getControl('body');
  }

  private getControl(name: string): any {
    return this.answerForm.get(name);
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { question: Question }) => (this.question = data.question)
    );
  }
}
