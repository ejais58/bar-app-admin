import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url: string = environment.apiUrl;
  constructor(private httpClient: HttpClient ) { }

  login(username: string, password: string): Observable<object> {
    return this.httpClient.post(`${this.base_url}/auth/login`, {username,password})
  }

  loggedIn() {
    const token = !!localStorage.getItem('token');
    return token;
  }
}
