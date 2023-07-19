import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Answer } from 'src/app/answers/answer.interface';
import { Question } from 'src/app/questions/question.model';
import { Comment } from 'src/app/comments/comment.model';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.scss'],
})
export class CommentNewComponent implements OnInit {
  @Input() commenter: string;
  @Input() commenterObject: Question | Answer;
  @Input() comment: Comment;
  @Input() isEdit = false;
  @Input() isFormOpen = false;
  @Output() openEvent = new EventEmitter<boolean>();
  commentForm = this.fb.group({ body: ['', Validators.required] });

  onAddComment() {
    this.openEvent.emit(true);
  }

  onBack() {
    this.openEvent.emit(false);
    this.commentForm.markAsUntouched();
  }

  onSubmitSuccess() {
    this.openEvent.emit(false);
    this.commentForm.patchValue({ body: '' });
    this.commentForm.markAsUntouched();
  }

  onSubmit() {
    if (this.commentForm.valid) {
      if (this.isEdit) {
        this.apiService
          .updateComment({ ...this.comment, ...this.commentForm.value })
          .subscribe(() => this.onSubmitSuccess());
      } else {
        this.apiService
          .createComment(
            this.commentForm.value,
            this.commenter,
            this.commenterObject
          )
          .subscribe(() => this.onSubmitSuccess());
      }
    }
  }

  get body() {
    return this.getControl('body');
  }

  private getControl(name: string): any {
    return this.commentForm.get(name);
  }

  constructor(private fb: UntypedFormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.isEdit) {
      this.commentForm.patchValue(this.comment);
    }
  }
}
