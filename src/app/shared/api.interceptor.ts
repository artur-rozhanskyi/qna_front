import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const copiedRequest = request.clone({
      withCredentials: true,
      headers: request.headers.set('Access-Control-Allow-Origin', '*'),
    });
    return next.handle(copiedRequest);
  }
}
