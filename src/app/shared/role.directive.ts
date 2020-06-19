import {
  OnInit,
  TemplateRef,
  ViewContainerRef,
  Input,
  Directive,
} from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import { Role } from './role';

@Directive({ selector: '[appUserRole]' })
export class RoleDirective implements OnInit {
  userRoles: Role[];
  ownerId: string;

  @Input() set appUserRoleOwner(ownerId) {
    if (!ownerId) {
      throw new Error('Owner Id is empty');
    }
    this.ownerId = ownerId;
  }
  @Input() set appUserRole(roles: Role[]) {
    if (!roles || !roles.length) {
      throw new Error('Roles is empty');
    }
    this.userRoles = roles;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    let hasAccess = false;

    this.store.pipe(select('auth')).subscribe((authState) => {
      if (authState.authenticated && this.userRoles) {
        hasAccess =
          parseInt(this.ownerId) === authState.user.id &&
          this.userRoles.some((role) => authState.user.role === role);
      }
      hasAccess && !this.viewContainer.length
        ? this.viewContainer.createEmbeddedView(this.templateRef)
        : this.viewContainer.clear();
    });
  }
}
