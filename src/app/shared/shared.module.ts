import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinerComponent } from './spiner/spiner.component';
import { DropdownDirective } from './dropdown.directive';
import { ManageButtonComponent } from './manage-button/manage-button.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleDirective } from './role.directive';
import { QuestionNavigateComponent } from './question-navigate/question-navigate.component';

@NgModule({
  declarations: [
    DropdownDirective,
    ManageButtonComponent,
    SpinerComponent,
    RoleDirective,
    QuestionNavigateComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageButtonComponent,
    SpinerComponent,
    QuestionNavigateComponent,
    RoleDirective,
    DropdownDirective,
  ],
})
export class SharedModule {}
