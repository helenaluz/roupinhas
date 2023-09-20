import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeralService {

  constructor(private http: HttpClient) { }

  getAllRoupas() : Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/Roupas")
  }

  addRoupa(obj:any): Observable<any>{
    return this.http.post<any>("http://localhost:3000/Roupas", obj)
  }

  deleteRoupa(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/Roupas/${id}`);
  }
}
