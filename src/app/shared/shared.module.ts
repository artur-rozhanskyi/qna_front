import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinerComponent } from './spiner/spiner.component';
import { DropdownDirective } from './dropdown.directive';
import { ManageButtonComponent } from './manage-button/manage-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DropdownDirective, ManageButtonComponent, SpinerComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    DropdownDirective,
    ManageButtonComponent,
    SpinerComponent,
  ],
})
export class SharedModule {}
