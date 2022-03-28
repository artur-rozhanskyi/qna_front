import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import snakeCase from 'snakecase-keys';

export class SnakeCaseInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.body !== null) {
      const opts: snakeCase.Options = {
        exclude: ['_destroy']
      };

      const cloneReq = request.clone({
        body: snakeCase(request.body, opts),
      });
      return next.handle(cloneReq);
    }
    return next.handle(request);
  }
}
