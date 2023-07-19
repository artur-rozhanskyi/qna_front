import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import camelcaseKeys from 'camelcase-keys';

import { PasswordValidator } from '../validators/password.validator';
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  errorMessage: string;
  isLoading: boolean;
  resetStatus: boolean;

  resetPasswordForm = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    },
    { validators: PasswordValidator, updateOn: 'submit' }
  );

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.store.dispatch(
        AuthActions.resetPassword({
          resetParams: {
            ...this.resetPasswordForm.value,
            resetPasswordToken: localStorage.getItem(
              environment.resetPasswordToken
            ),
          },
        })
      );
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  get password() {
    return this.getControl('password');
  }

  get passwordConfirmation() {
    return this.getControl('passwordConfirmation');
  }

  private getControl(name: string): any {
    return this.resetPasswordForm.get(name);
  }

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      for (const [key, value] of Object.entries(camelcaseKeys(queryParams))) {
        localStorage.setItem(key, value);
      }
    });
    this.store.pipe(select('auth')).subscribe((authState) => {
      this.errorMessage = authState.error;
      this.resetStatus = authState.resetPassword;
    });
  }
  ngOnDestroy() {
    this.store.dispatch(AuthActions.errorClear());
  }
}
