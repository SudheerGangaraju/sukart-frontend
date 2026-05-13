import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly refreshUrl = `${environment.apiBaseUrl}/auth/refresh`;

  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.addAuthHeader(req);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.shouldRefresh(error, authReq)) {
          return this.refreshToken(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken || this.isAuthRequest(req)) {
      return req;
    }

    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  private shouldRefresh(error: HttpErrorResponse, req: HttpRequest<any>): boolean {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const canRefreshStatus = error.status === 401 || error.status === 403;

    return canRefreshStatus && !!refreshToken && !this.isAuthRequest(req);
  }

  private isAuthRequest(req: HttpRequest<any>): boolean {
    return req.url.includes('/auth/login')
      || req.url.includes('/auth/register')
      || req.url.includes('/auth/refresh');
  }

  private refreshToken(req: HttpRequest<any>, next: HttpHandler) {
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (!refreshToken) {
      return throwError(() => new Error('Missing refresh token'));
    }

    return this.http.post<any>(this.refreshUrl, { refreshToken }).pipe(
      switchMap((response) => {
        sessionStorage.setItem('accessToken', response.accessToken);

        if (response.refreshToken) {
          sessionStorage.setItem('refreshToken', response.refreshToken);
        }

        const newRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        });

        return next.handle(newRequest);
      })
    );
  }
}
