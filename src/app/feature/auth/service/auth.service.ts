import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Payload } from 'src/app/models/payload.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url: string = environment.apiUrl;

  currentUserSubject = new BehaviorSubject<Payload>({userId:'', userFullName: '', userBarName: ''});
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient ) {
    const token = localStorage.getItem('token')
    if (token){
      const payload = this.decodeToken(token)
      this.currentUserSubject.next(payload);
    }
   }

  login(username: string, password: string): Observable<object> {
    return this.httpClient.post(`${this.base_url}/auth/login`, {username,password}).pipe(
      tap((user: any) => {
        // Al recibir la respuesta del servidor, actualizamos el currentUserSubject
      
        const payload = this.decodeToken(user.token)
        this.currentUserSubject.next(payload);
        
      })
    );
  }

  getCurrentUser(){
    return this.currentUserSubject.asObservable();
  }

  loggedIn() {
    const token = !!localStorage.getItem('token');
    return token;
  }

  decodeToken(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
        
    const decodedToken = JSON.parse(decodedPayload);

    const user = decodedToken

    return user
  }
}
