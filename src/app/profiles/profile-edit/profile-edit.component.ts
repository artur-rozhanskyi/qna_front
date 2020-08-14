import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { User } from 'src/app/shared/user.model';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  user: User;

  profileForm = this.fb.group({ firstName: ['1'], lastName: ['1'] });

  onSubmit() {
    this.store.dispatch(
      AuthActions.updateProfile({
        user: this.user,
        profileParams: { ...this.profileForm.value },
      })
    );
  }

  onBack() {
    this.goBack();
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  constructor(
    private store: Store<fromApp.AppState>,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.pipe(select('auth')).subscribe((authState) => {
      this.profileForm.patchValue({ ...authState.user.profile });
      this.user = authState.user;
    });
  }
}
