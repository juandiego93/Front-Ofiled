import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as alertify from 'alertifyjs'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  IsLogin: boolean

  constructor(private authService: AuthService, private router: Router) {
    this.authService.customLoginBehaviorSubject.subscribe(resp => this.IsLogin = resp)
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.IsLogin) {
      return true
    }
    alertify.alert('No ha iniciado sesión', 'Para ingresar por favor inicie sesión!');
    return this.router.parseUrl('/login');
  }

}
