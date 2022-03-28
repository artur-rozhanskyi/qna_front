import { Component, OnInit, Input } from '@angular/core';
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
  onDelete = () => {
    this.api.deleteAnswer(this.answer).subscribe();
  }

  onEditOpen(isOpen: boolean) {
    this.isEditOpen = isOpen;
  }

  onAddComment(isOpen: boolean) {
    this.isNewCommentOpen = isOpen;
  }

  constructor(
    private api: ApiService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select('auth'))
      .subscribe((authState) => (this.isAuth = authState.authenticated));
  }
}
