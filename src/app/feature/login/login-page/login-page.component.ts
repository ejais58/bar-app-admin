import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { Payload } from 'src/app/models/payload.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginSubscribe: Subscription;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginSubscribe = new Subscription();
  }


  miFormulario: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })


  ngOnInit() {

  }


  getErrorMessage(controlName: string): string {
    const control = this.miFormulario.get(controlName);

    if (control?.hasError('required')) {
      return 'You must enter a value';
    }

    return control?.hasError('username') ? 'Not a valid email' : '';
  }

  login() {

    const {username, password} = this.miFormulario.value
    
    this.loginSubscribe = this.authService.login(username,password).subscribe((respuesta: any) =>{
      console.log(respuesta);

      if (respuesta.token) {
        // Guardar el token en localStorage
        localStorage.setItem('token', respuesta.token);
        
        this.router.navigate(['/home'])
      } else {
        console.error(respuesta);
      }

    })
  }


  ngOnDestroy(): void {
    if (this.loginSubscribe) {
      this.loginSubscribe.unsubscribe();
    }
  }

  hide = true;

}
