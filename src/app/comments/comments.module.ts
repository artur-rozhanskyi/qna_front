import { NgModule } from '@angular/core';

import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment/comment.component';
import { CommentNewComponent } from './comment-new/comment-new.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CommentsComponent, CommentComponent, CommentNewComponent],
  imports: [SharedModule],
  exports: [CommentsComponent, CommentNewComponent],
})
export class CommentsModule {}
