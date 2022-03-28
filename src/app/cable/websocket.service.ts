import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable()
export class WebSocketService {
  private ws: WebSocketSubject<any>;
  private get wsSubject(): WebSocketSubject<any> {
    const closed = !this.ws || this.ws.closed;
    if (closed) {
      this.ws = new WebSocketSubject(environment.wsUrl);
    }
    return this.ws;
  }

  public get subject$(): Observable<any> {
    return this.wsSubject.asObservable();
  }

  public sendToSocket(channel = {}) {
    this.ws.next(channel);
  }

  constructor() {}
}
