import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endPoint, httpOptions } from '../constants';
import { HttpHeaderService } from './http-header.service';

@Injectable({
  providedIn: 'root'
})
export class FormationService {


  constructor(private http: HttpClient,private readonly httpHeader:HttpHeaderService) { }


  getListCategory()
  { 
        return this.http.get(endPoint+'formation',{
            'headers': new HttpHeaders({
                Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
            })
        });
  }
  
  getListSousCategory(id,tagName)
  { 
        return this.http.get(endPoint+'formation/formations/'+id+'/'+tagName,{
            'headers': new HttpHeaders({
                Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
            })
        });
  }

  addCategory(data){
      return this.http.post(endPoint+'formation',data,{
        'headers': new HttpHeaders({
            Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
        })
    });
  }

  addSousCategory(data){
      return this.http.post(endPoint+'formation/formation',data,{
        'headers': new HttpHeaders({
            Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
        })
    });
  }

  addDataCours(data)
  { 
        return this.http.post<any>(endPoint+'formation/cours',data,{
            'headers': new HttpHeaders({
                Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
            })
        });
  }

  getDataCours(id)
  { 
        return this.http.get<any>(endPoint+'formation/cours/'+id,{
            'headers': new HttpHeaders({
                Authorization: `Bearer ${this.httpHeader.authorizationStringExport}`
            })
        });
  }


}
