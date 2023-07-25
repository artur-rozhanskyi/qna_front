import { Component, OnInit, Input, inject } from '@angular/core';
import { Comment } from '../comment.model';
import { Role } from 'src/app/shared/role';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment: Comment;
  isEditOpen = false;
  Role = Role;
  api = inject(ApiService);

  onDelete = () => {
    this.api.deleteComment(this.comment).subscribe();
  }

  onShowEditChange(isOpen: boolean) {
    this.isEditOpen = isOpen;
  }
}
