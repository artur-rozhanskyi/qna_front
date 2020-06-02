import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isLoading = false;
  errorMessage = null;

  get email() {
    return this.getControl('email');
  }

  get password() {
    return this.getControl('password');
  }

  private getControl(name: string): any {
    return this.authForm.get(name);
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.authCleare());
    this.store.pipe(select('auth')).subscribe((authState) => {
      this.isLoading = authState.loading;
      this.errorMessage = authState.error;
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.store.dispatch(
        AuthActions.loginStart({ auth: this.authForm.value })
      );
    } else {
      this.authForm.markAllAsTouched();
    }
  }
}
