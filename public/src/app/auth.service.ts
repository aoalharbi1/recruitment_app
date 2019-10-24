import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _recruiterRegisterUrl = '/recruiter';
  private _recruiterLoginUrl = '/recruiter/login';

  constructor(private http: HttpClient) { }

  registerRecruiter(user) {
    return this.http.post<any>(this._recruiterRegisterUrl, user);
  }

  loginRecruiter(user) {
    return this.http.post<any>(this._recruiterLoginUrl, user);
  }

  loggedIn() {
    console.log(!!localStorage.getItem('token'));

    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
