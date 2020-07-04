import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHeaderService } from './http-header.service';
import { endPoint } from '../constants';
import { User } from '../_interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private readonly httpHeader:HttpHeaderService) { }

  getProfile(id):Observable<User>
  { 
        return this.http.get<User>(endPoint+'users/profile/'+id,{
            'headers': new HttpHeaders({
                Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
            })
        });
  }

  updateProfil(data)
  { 
        return this.http.post<any>(endPoint+'users/profil/update',data,{
            'headers': new HttpHeaders({
                Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
            })
        });
  }

  updateCover(data)
  { 
        return this.http.post<any>(endPoint+'users/cover/update',data,{
            'headers': new HttpHeaders({
                Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
            })
        });
  }

  updateDataContent(data){
        return this.http.put<User>(endPoint+'users',data,{
            'headers': new HttpHeaders({
                Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
            })
        });
  }


}
