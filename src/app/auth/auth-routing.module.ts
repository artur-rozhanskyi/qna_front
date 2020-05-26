import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'regestration', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
