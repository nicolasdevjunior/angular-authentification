import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  of, throwError } from 'rxjs';
import { endPoint, httpOptions } from '../constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser : Observable<any>;

    constructor(private http: HttpClient) { 
        let currentUserData = JSON.parse(localStorage.getItem('currentUser'));
        // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUserData == null){
            this.currentUserSubject = new BehaviorSubject<any>(null);
            this.currentUser = null;
            // console.log("ds");
        }else{
            this.currentUserSubject = new BehaviorSubject<any>(currentUserData);
            this.currentUser = this.currentUserSubject;
        }
    }

    public get currentUserValue() { 
        if(this.currentUserSubject == null){
             return null;
        }else{
            return this.currentUserSubject.value;
        }
    }

    login(username: string, password: string) {
        let body = {
            username : username,
            password : password
        }
        return this.http.post<any>(endPoint+`auth/login/`,body,httpOptions)
            .pipe(map(token => {
                // console.log('token:',token);
                // login successful if there's a jwt token in the response
                if (token != null){
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // var data ={
                    //     token : token.token
                    // };
                    localStorage.setItem('currentUser', JSON.stringify(token));
                    //localStorage.setItem('token' ,token.access_token);
                    
                    this.currentUserSubject.next(token);
                    return token;
                }else{ 
                  console.log('token:',token);
                  return "Username or password is incorrect";
                }
            }));
    }

    

    error(message) {
        return throwError({ status: 400, error: { message } });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }



}
