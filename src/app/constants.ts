import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
};

export const endPoint ="http://localhost:7000/";
export const endPointSocket ="http://localhost:8080/";