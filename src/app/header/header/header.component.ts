import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import { Router } from '@angular/router';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu = [];
  isAuthenticated = false;
  isLoading = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.pipe(select('auth')).subscribe((authState) => {
      this.isAuthenticated = authState.authenticated;
      this.isLoading = authState.loading;
    });
  }

  login() {
    this.router.navigate(['/auth']);
  }

  logout() {
    this.store.dispatch(AuthActions.logoutStart());
  }

  signUp() {
    this.router.navigate(['/auth', 'regestration']);
  }
}
