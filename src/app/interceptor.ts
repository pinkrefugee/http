import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const authToken = 'Boo';
      const started = Date.now();
      let status: string;
      const secureReq = req.clone({
        url: req.url.replace('http://', 'https://'),
        headers: req.headers.set('Authorization', authToken)
      });
      return next.handle(secureReq).pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => status = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => status = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${status} in ${elapsed} ms.`;
          console.log(msg);
        }));
  }
}
