import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth/store/auth.actions';
import * as fromApp from './store/app.reducers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const token = localStorage.getItem(environment.tokenName);
    if (token) {
      this.store.dispatch(AuthActions.autoLogin());
    }
  }
  constructor(private store: Store<fromApp.AppState>) {}
}
