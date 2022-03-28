import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';

@Injectable()
export class CommentSocketService extends ChannelService {
  channelName = 'CommentsChannel';
  channel = {
    identifier: `{"channel": "${this.channelName}" }`,
  };

  get comment$() {
    return super.subject$;
  }
}
