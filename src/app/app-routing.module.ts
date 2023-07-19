import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { QuestionsGuard } from './questions/guards/questions.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./profiles/profiles.module').then((mod) => mod.ProfilesModule),
    canActivateChild: [],
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('./questions/questions.module').then((mod) => mod.QuestionsModule),
    canActivateChild: [QuestionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
  providers: [AuthGuard, QuestionsGuard],
})
export class AppRoutingModule {}
