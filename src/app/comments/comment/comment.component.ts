import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment.model';
import { Role } from 'src/app/shared/role';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  isEditOpen = false;
  Role = Role;
  onDelete = () => {
    this.api.deleteComment(this.comment).subscribe();
  }

  onShowEditChange(isOpen: boolean) {
    this.isEditOpen = isOpen;
  }

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
