import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  urlServer: string

  constructor(private http: HttpClient) {
    this.urlServer = environment.urlServer
  }

  registerUser(newUser: User): Promise<any> {
    return this.http.post(`${this.urlServer}/user`, newUser).toPromise()
  }


}
