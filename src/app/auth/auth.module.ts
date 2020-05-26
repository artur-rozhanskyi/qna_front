import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { authReducer } from './store/auth.reducers';
import { AuthEffects } from './store/auth.effects';
import { AuthService } from './auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [AuthComponent, SignUpComponent],
  imports: [
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    CommonModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
