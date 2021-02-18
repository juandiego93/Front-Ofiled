import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  IsLogin: boolean


  constructor(private authService: AuthService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.authService.customLoginBehaviorSubject.subscribe(resp => this.IsLogin = resp)
  }

  Logout() {
    const user = this.authService.getDataInLocalStorage('user')
    console.log(user);
    this.loginService.logoutUser()
    this.authService.changeValueLoginBehaviorSubject(false)
  }

}
