import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Login } from '../interface/Login.interface';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlServer: string

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.urlServer = environment.urlServer
  }

  loginUser(userLogin: Login): Promise<any> {
    console.log(userLogin);

    return this.http.post(`${this.urlServer}/login`, userLogin).toPromise()
  }

  logoutUser() {
    this.authService.clearStorage() 
    return this.router.parseUrl('/login');
  }

}
