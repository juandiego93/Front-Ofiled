import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FormGroup_: FormGroup

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) {
    this.FormGroup_ = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required]))
    })
  }

  ngOnInit(): void {
  }

  ngOnSubmit() {
    this.loginService.loginUser(this.FormGroup_.value)
      .then(response => {
        if (response['ok']) {
          console.log(response)
          this.authService.changeValueLoginBehaviorSubject(response['ok'])
          this.authService.changeValueLoginBehaviorSubject(true)
          this.authService.setDataInLocalStorage('token', response['token'])
          this.authService.setDataInLocalStorage('user', JSON.stringify(this.FormGroup_.value))
          alertify.success('Ha iniciado sesión');
          this.router.navigate(['home'])
        }
      })
      .catch(error => {
        console.log(error)
        this.authService.clearStorage()
        alertify.error('Error al hacer iniciar sesión, revise los campos.')
      })
  }

}
