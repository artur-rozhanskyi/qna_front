import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/questions/question.model';
import { ApiService } from 'src/app/api.service';
import { Answer } from '../answer.interface';

@Component({
  selector: 'app-answer-new',
  templateUrl: './answer-new.component.html',
  styleUrls: ['./answer-new.component.scss'],
})
export class AnswerNewComponent implements OnInit {
  answerForm = this.fb.group({ body: ['', [Validators.required]] });
  question: Question;
  @Input() isEdit = false;
  @Output() open = new EventEmitter<boolean>();

  onSubmit() {
    if (this.answerForm.valid) {
      if (this.isEdit) {
        this.api
          .updateAnswer({ ...this.answer, ...this.answerForm.value })
          .subscribe();
        this.onBack();
      } else {
        this.api.createAnswer(this.question, this.answerForm.value).subscribe();
        this.answerForm.patchValue({ body: '' });
      }
      this.answerForm.markAsUntouched();
    }
  }

  onBack() {
    this.open.emit(false);
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
    if (this.isEdit) {
      this.answerForm.patchValue(this.answer);
    }
  }
}
