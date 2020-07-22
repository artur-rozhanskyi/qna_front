import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class QuestionSocketService extends ChannelService {
  channelName = 'QuestionsChannel';
  channel = {
    command: 'subscribe',
    identifier: '{"channel": "QuestionsChannel" }',
  };

  get question$() {
    return super.subject$;
  }
}
