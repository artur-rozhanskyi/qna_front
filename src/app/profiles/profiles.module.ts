import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  declarations: [ProfileComponent, ProfileInfoComponent, ProfileEditComponent],
  imports: [ProfilesRoutingModule, SharedModule],
  providers: []
})
export class ProfilesModule {}
