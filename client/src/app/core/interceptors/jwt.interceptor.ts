import { AccountService } from 'src/app/account/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  token?: string;
  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe((val) => { this.token = val?.token });
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    return next.handle(request);

  }
}
