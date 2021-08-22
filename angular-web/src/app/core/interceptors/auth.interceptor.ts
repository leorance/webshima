import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { constants } from 'src/app/shared/common/constants';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }

    headerSettings['Authorization'] = `Bearer ${this.cookieService.get(constants.storageKey.accesTokenKey)}`;

    const newHeader = new HttpHeaders(headerSettings);

    const changedRequest = request.clone({
      headers: newHeader
    });

    return next.handle(changedRequest)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            this.cookieService.deleteAll();
            alert('Anda tidak memiliki akses, silahkan login');
            this.router.navigate(['/login']);
          } else {
            return throwError(err);
          }
        })
      );
  }
}
