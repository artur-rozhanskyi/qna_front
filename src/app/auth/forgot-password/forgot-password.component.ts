import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotForm = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
    },
    { updateOn: 'submit' }
  );

  isLoading = false;
  errorMessage: string;
  forgotStatus: boolean;

  get email() {
    return this.getControl('email');
  }

  private getControl(name: string): any {
    return this.forgotForm.get(name);
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.store.dispatch(
        AuthActions.forgotPassword({ forgotParams: this.forgotForm.value })
      );
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }

  onBack() {
    this.router.navigate(['auth']);
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.forgotPasswordFalse());
    this.store.pipe(select('auth')).subscribe((authState) => {
      this.errorMessage = authState.error;
      this.forgotStatus = authState.forgotPassword;
      this.isLoading = authState.loading;
    });
  }

  ngOnDestroy() {
    this.store.dispatch(AuthActions.errorClear());
  }
}
