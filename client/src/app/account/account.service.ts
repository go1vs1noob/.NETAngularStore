import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { User } from './interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _currentUserSource = new ReplaySubject<User | null>(1);
  rootUrl = "/api/";
  currentUser$ = this._currentUserSource.asObservable();
  constructor(private httpClient: HttpClient, private router: Router) { }

  loadCurrentUser(token: string | null) {
    // user is not logged in and refreshed page
    // this way null token is provided, so we need to provide replay subject
    // with observable of null, so that checkout doesn't break because of auth guard
    if (token === null) {
      this._currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<User>(this.rootUrl + "account", { headers }).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('token', user.token);
          this._currentUserSource.next(user);
          return user;
        }
        else {
          return null;
        }
      })
    );
  }

  login(values: any) {
    return this.httpClient.post<User>(this.rootUrl + "account/login", values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this._currentUserSource.next(user);
      })
    );
  }
  register(values: any) {
    return this.httpClient.post<User>(this.rootUrl + "account/register", values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this._currentUserSource.next(user);
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this._currentUserSource.next(null);
    this.router.navigateByUrl('/account/login');
  }
  checkEmailExists(email: string) {
    this.httpClient.get<boolean>(this.rootUrl + 'account/emailexists?email=' + email);
  }
}
