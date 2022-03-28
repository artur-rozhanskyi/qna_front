import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { authReducer } from './store/auth.reducers';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    SharedModule,
  ],
})
export class AuthModule {}
