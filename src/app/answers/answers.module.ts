import { NgModule } from '@angular/core';
import { AnswersComponent } from './answers.component';
import { AnswerComponent } from './answer/answer.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AttachmentComponent } from './attachments/attachment/attachment.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AnswersComponent,
    AnswerComponent,
    AttachmentsComponent,
    AttachmentComponent,
  ],
  imports: [CommonModule],
  exports: [AnswersComponent],
})
export class AnswersModule {}
