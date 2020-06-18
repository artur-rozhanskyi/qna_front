import { NgModule } from '@angular/core';
import { AnswersComponent } from './answers.component';
import { AnswerComponent } from './answer/answer.component';
import { AnswerNewComponent } from './answer-new/answer-new.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsModule } from '../comments/comments.module';
import { AttachmentsModule } from '../attachments/attachments.module';

@NgModule({
  declarations: [AnswersComponent, AnswerComponent, AnswerNewComponent],
  imports: [AttachmentsModule, CommentsModule, SharedModule],
  exports: [AnswersComponent, AnswerNewComponent],
})
export class AnswersModule {}
