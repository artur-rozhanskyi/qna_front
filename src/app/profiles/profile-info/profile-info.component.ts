import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  user: User;
  allowEdit = true;

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ user: { user, allowEdit } }) => {
      this.user = user;
      this.allowEdit = allowEdit;
    });
  }

  constructor(private router: Router, private route: ActivatedRoute) {}
}
