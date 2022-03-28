import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu: { link: string; name: string }[] = [
    { link: 'questions', name: 'questions' },
  ];
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.pipe(select('auth')).subscribe((authState) => {
      this.isAuthenticated = authState.authenticated;
      this.isLoading = authState.loading;
      this.user = authState.user;
    });
  }

  login() {
    this.router.navigate(['/auth']);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  signUp() {
    this.router.navigate(['/auth', 'registration']);
  }

  onProfile() {
    this.router.navigate(['/users', this.user.id]);
  }
}
