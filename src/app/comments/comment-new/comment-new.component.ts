import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Answer } from 'src/app/answers/answer.interface';
import { Question } from 'src/app/questions/question.model';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.scss'],
})
export class CommentNewComponent implements OnInit {
  @Input() commenter: string;
  @Input() commenterObject: Question | Answer;
  isFormOpen = false;
  commentForm = this.fb.group({ body: ['', Validators.required] });

  onAddComment() {
    this.isFormOpen = !this.isFormOpen;
  }

  onBack() {
    this.onAddComment();
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.apiService
        .createComment(
          this.commentForm.value,
          this.commenter,
          this.commenterObject
        )
        .subscribe(() => this.onAddComment());
      this.commentForm.patchValue({ body: '' });
    }
  }

  get body() {
    return this.getControl('body');
  }

  private getControl(name: string): any {
    return this.commentForm.get(name);
  }

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {}
}
