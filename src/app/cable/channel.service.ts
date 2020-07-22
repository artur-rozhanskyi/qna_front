import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { tap, map, filter } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class ChannelService {
  protected isSubscribed = false;
  protected channel: any;
  protected channelName = '';

  constructor(protected wsService: WebSocketService) {}

  protected get subject$() {
    return this.wsService.subject$.pipe(
      tap(() => {
        if (!this.isSubscribed) {
          this.wsService.subscribeToChannel(this.channel);
          this.isSubscribed = !this.isSubscribed;
        }
      }),
      filter(
        (response) =>
          this.isSubscribed &&
          response.identifier &&
          response.message &&
          JSON.parse(response.identifier).channel === this.channelName
      ),
      map((response) => camelcaseKeys(response.message, { deep: true }))
    );
  }

  updateChannel(subject?: any) {
  }

  unsubscribe(subject?: any) {
    if (subject) {
      this.channel = this.updateChannel(subject);
    }
    this.channel = { ...this.channel, command: 'unsubscribe' };
    this.isSubscribed = false;
  }
}
