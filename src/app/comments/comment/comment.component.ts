import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment.model';
import { Role } from 'src/app/shared/role';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  isEditOpen = false;
  Role = Role;

  onShowEditChange(isOpen: boolean) {
    this.isEditOpen = isOpen;
  }

  constructor() {}

  ngOnInit(): void {}
}
