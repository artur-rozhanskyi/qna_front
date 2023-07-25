import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  user: User;
  allowEdit = true;

  router = inject(Router);
  route = inject(ActivatedRoute);

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ user: { user, allowEdit } }) => {
      this.user = user;
      this.allowEdit = allowEdit;
    });
  }
}
