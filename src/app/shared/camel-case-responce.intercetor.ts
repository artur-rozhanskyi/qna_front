import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class CamelCaseResponceInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((evt) => {
        if (evt instanceof HttpResponse) {
          return evt.clone({
            ...evt,
            body: camelcaseKeys(evt.body, { deep: true }),
          });
        } else {
          return evt;
        }
      })
    );
  }
}
