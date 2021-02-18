import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public customLoginBehaviorSubject = this.loginBehaviorSubject.asObservable()

  constructor() {
  }

  public changeValueLoginBehaviorSubject(value: boolean) {
    this.loginBehaviorSubject.next(value)
  }

  getDataInLocalStorage(key: string) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
  }

  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  clearStorage() {
    localStorage.clear()
  }

}
