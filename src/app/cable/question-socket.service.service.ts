import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';

@Injectable()
export class QuestionSocketService extends ChannelService {
  channelName = 'QuestionsChannel';
  channel = {
    identifier: '{"channel": "QuestionsChannel" }',
  };

  get question$() {
    return super.subject$;
  }
}
