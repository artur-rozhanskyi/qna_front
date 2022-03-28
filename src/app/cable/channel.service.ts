import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { tap, map, filter } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';

enum State {
  Subscribed,
  Unsubscribed,
  StandBy,
  Await,
}

enum ChannelResponse {
  ConfirmSubscription = 'confirm_subscription',
  Ping = 'ping',
}

enum ChannelCommand {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe'
}

@Injectable()
export class ChannelService {
  protected channel: any;
  protected channelName: string;
  private state: State;

  constructor(protected wsService: WebSocketService) {}

  protected get subject$() {
    return this.wsService.subject$.pipe(
      tap(() => {
        if (this.state === State.StandBy) {
          this.channel = { ...this.channel, command: ChannelCommand.Subscribe };
          this.wsService.sendToSocket(this.channel);
          this.state = State.Await;
        }
      }),
      tap((response) => {
        if (
          response.type === ChannelResponse.ConfirmSubscription &&
          this.checkChannelName(response.identifier)
        ) {
          this.state = State.Subscribed;
        }
      }),
      filter(
        (response) =>
          this.state === State.Subscribed &&
          response.identifier &&
          response.message &&
          this.checkChannelName(response.identifier)
      ),
      map((response) => camelcaseKeys(response.message, { deep: true }))
    );
  }

  resubscribe() {
    this.state = State.StandBy;
  }

  updateChannel(subject?: any) {}

  unsubscribe() {
    if (this.state === State.Subscribed) {
      this.channel = { ...this.channel, command: ChannelCommand.Unsubscribe };
      this.wsService.sendToSocket(this.channel);
      this.state = State.Unsubscribed;
    }
  }

  private checkChannelName(identifier: string) {
    return JSON.parse(identifier).channel === this.channelName;
  }
}
