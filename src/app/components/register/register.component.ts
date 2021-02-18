import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../interface/Login.interface';
import { LoginService } from '../../services/login.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  FormGroup_: FormGroup

  constructor(private registerService: RegisterService, private authService: AuthService, private loginService: LoginService, private router: Router) {
    this.FormGroup_ = new FormGroup({
      fullname: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),
      password: new FormControl('', Validators.compose([Validators.required]))
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.registerService.registerUser(this.FormGroup_.value)
      .then(response => {
        if (response['ok']) {
          console.log(response)
          this.Login(this.FormGroup_.value)
          alertify.success('Se ha registrado correctamente');
        }
      })
      .catch(error => {
        console.log(error)
        this.authService.clearStorage()
        alertify.success('Ha ocurrido un error al registrarse');
      })
  }

  Login(user: Login) {
    this.loginService.loginUser({ email: this.FormGroup_.value.email, password: this.FormGroup_.value.password })
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
