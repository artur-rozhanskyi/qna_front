import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AttachmentsComponent } from './attachments.component';
import { AttachmentComponent } from './attachment/attachment.component';

@NgModule({
  declarations: [AttachmentsComponent, AttachmentComponent],
  imports: [SharedModule],
  exports: [AttachmentsComponent]
})
export class AttachmentsModule {}
