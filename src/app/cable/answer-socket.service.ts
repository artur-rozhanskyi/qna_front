import { Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { Question } from '../questions/question.model';

@Injectable()
export class AnswerSocketService extends ChannelService {
  channelName = 'AnswersChannel';

  setQuestion(question: Question) {
    this.channel = this.updateChannel(question);
    this.isSubscribed = false;
  }

  get answer$() {
    return super.subject$;
  }

  updateChannel(subject: any) {
    return {
      command: 'subscribe',
      identifier: `{"channel": "${this.channelName}", "question_id": ${subject.id} }`,
    };
  }
}
