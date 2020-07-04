import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  public httpOptionsWithToken = {};
  public authorizationStringExport;
  
  constructor() {
      const currentToken = JSON.parse(localStorage.getItem('currentUser'));
      const authorizationString = (currentToken) ? currentToken.access_token : undefined;  
      this.authorizationStringExport = authorizationString;   
      this.httpOptionsWithToken ={
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authorizationString}`
          })  
      }
   }
}
