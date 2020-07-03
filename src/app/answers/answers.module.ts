import { NgModule } from '@angular/core';
import { AnswersComponent } from './answers.component';
import { AnswerComponent } from './answer/answer.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AttachmentComponent } from './attachments/attachment/attachment.component';
import { AnswerNewComponent } from './answer-new/answer-new.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AnswersComponent,
    AnswerComponent,
    AttachmentsComponent,
    AttachmentComponent,
    AnswerNewComponent,
  ],
  imports: [SharedModule],
  exports: [AnswersComponent, AnswerNewComponent],
})
export class AnswersModule {}
