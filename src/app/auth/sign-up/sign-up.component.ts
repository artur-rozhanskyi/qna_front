import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import { PasswordValidator } from '../validators/password.validator';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    { validators: PasswordValidator }
  );

  isLoading = false;
  errorMessage = null;

  get email() {
    return this.getControl('email');
  }

  get password() {
    return this.getControl('password');
  }

  get passwordConfirmation() {
    return this.getControl('passwordConfirmation');
  }

  private getControl(name: string): any {
    return this.signUpForm.get(name);
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.authCleare());
    this.store.pipe(select('auth')).subscribe((authState) => {
      this.errorMessage = authState.error;
      this.isLoading = authState.loading;
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.store.dispatch(AuthActions.signUpStart(this.signUpForm.value));
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
