import { Component, OnInit, Input, inject } from '@angular/core';
import { Answer } from '../answer.interface';
import { Role } from '../../shared/role';
import { ApiService } from 'src/app/api.service';
import * as fromApp from '../../store/app.reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer;
  Role = Role;
  isAuth = false;
  isEditOpen = false;
  isNewCommentOpen = false;
  commenter = 'answer';

  api = inject(ApiService)
  authStore = inject(Store<fromApp.AppState>).pipe(select('auth'))

  onDelete = () => {
    this.api.deleteAnswer(this.answer).subscribe();
  }

  onEditOpen(isOpen: boolean) {
    this.isEditOpen = isOpen;
  }

  onAddComment(isOpen: boolean) {
    this.isNewCommentOpen = isOpen;
  }

  ngOnInit(): void {
    this.authStore.subscribe((authState) => (this.isAuth = authState.authenticated));
  }
}
