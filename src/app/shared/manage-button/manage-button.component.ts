import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-manage-button',
  templateUrl: './manage-button.component.html',
  styleUrls: ['./manage-button.component.scss'],
})
export class ManageButtonComponent implements OnInit {
  @Input() editLink;
  @Input() dispachDeleteAction;
  @Input() isStoreDispatch: boolean;
  @Output() isOpen = new EventEmitter<boolean>();

  onEdit() {
    if (this.editLink) {
      this.router.navigate(this.editLink);
    } else {
      this.isOpen.emit(true);
    }
  }

  onDelete() {
    if (this.isStoreDispatch) {
      this.store.dispatch(this.dispachDeleteAction());
    } else {
      this.dispachDeleteAction();
    }
  }
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {}
}
