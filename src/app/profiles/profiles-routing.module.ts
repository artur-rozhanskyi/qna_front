import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { UserResolver } from './resolvers/user.resolver';

const profilesRoutes: Routes = [
  {
    path: ':id',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileInfoComponent,
        resolve: { user: UserResolver },
      },
      { path: 'edit', component: ProfileEditComponent },
    ],
    resolve: { user: UserResolver },
  },
  // {
  //   path: ':id',
  //   component: ProfileComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: ProfileInfoComponent,
  //     },
  //     { path: 'edit', component: ProfileEditComponent },
  //   ],
  //   resolve: { user: UserResolver },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(profilesRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class ProfilesRoutingModule {}
