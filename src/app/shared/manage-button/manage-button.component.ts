import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-manage-button',
  templateUrl: './manage-button.component.html',
  styleUrls: ['./manage-button.component.scss'],
})
export class ManageButtonComponent implements OnInit {
  @Input() editLink: string = '';
  @Input() dispachDeleteAction;

  onDelete() {
    this.store.dispatch(this.dispachDeleteAction());
  }
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}
}
