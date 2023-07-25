import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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
  @Input() answer: Answer;
  @Input() isEdit = false;
  @Output() isOpen = new EventEmitter<boolean>();

  fb = inject(UntypedFormBuilder);
  route = inject(ActivatedRoute);
  api = inject(ApiService);

  answerForm = this.fb.group({ body: ['', [Validators.required]] });
  files: File;
  question: Question;

  onSubmit() {
    if (this.answerForm.valid) {
      if (this.isEdit) {
        this.api
          .updateAnswer({
            id: this.answer.id,
            body: this.answer.body,
            ...this.answerForm.value,
            attachmentsAttributes: this.files,
          } as Answer)
          .subscribe();
        this.onBack();
      } else {
        this.api
          .createAnswer(this.question, {
            ...this.answerForm.value,
            attachmentsAttributes: this.files,
          })
          .subscribe();
        this.answerForm.patchValue({ body: '' });
      }
      this.answerForm.markAsUntouched();
    }
  }

  onBack() {
    this.isOpen.emit(false);
  }

  get body() {
    return this.getControl('body');
  }

  private getControl(name: string): any {
    return this.answerForm.get(name);
  }

  onAddAttachment(files) {
    this.files = files;
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { question: Question }) => (this.question = data.question)
    );
    if (this.isEdit) {
      this.answerForm.patchValue(this.answer);
    }
  }
}
