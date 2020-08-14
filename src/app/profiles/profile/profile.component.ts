import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { User, UserResolved } from 'src/app/shared/user.model';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;
  noProfileImagePath = environment.profile.avatarMissImagePath;
  errorMessage: string;

  getUrl() {
    return this.user?.profile?.avatar
      ? `${environment.apiUrl}${this.user?.profile?.avatar}`
      : this.noProfileImagePath;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = () => {
        this.store.dispatch(
          AuthActions.updateProfile({
            user: this.user,
            profileParams: {
              avatar: {
                data: reader.result,
                filename: event.target.files[0].name,
              },
            },
          })
        );
      };
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ user: { user, error } }: { user: UserResolved }) => {
        error ? (this.errorMessage = error) : (this.user = user);
      }
    );
  }

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute
  ) {}
}
