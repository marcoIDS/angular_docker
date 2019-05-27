import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API : string ="http://134.209.161.168:8000/api/v1/"

  constructor(
    private http : HttpClient,
  ) { }
  
  
  getAll(): Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders ({
        'Content-Type' :'application/json'
      })
    }
    return  this.http.get(`${this.API}songs/`);  
  }

  create(item:any): Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders ({
        'Content-Type' :'application/json' 
      })
    }
    return  this.http.post(`${this.API}songs/`,item,httpOptions); 
  }

  update(item:any,id): Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders ({
        'Content-Type' :'application/json'
      })
    }
    return  this.http.put(`${this.API}songs/${id}`,item,httpOptions); 
  }

  detele(id:string): Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders ({
        'Content-Type' :'application/json'
      })
    }
    return  this.http.delete(`${this.API}songs/${id}`,httpOptions);  
  }


}
