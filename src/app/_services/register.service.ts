import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../_interfaces/user.interface';
import { httpOptions, endPoint } from '../constants';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  addUser(data) {
    return this.http.post<any>(endPoint + 'users', data);
  }
}
