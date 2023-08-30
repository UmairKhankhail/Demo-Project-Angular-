import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DepartmentApiService {

  private baseUrl = 'http://localhost:8007/api';
 
  public  jwtToken !: string | null;

  // setToken(token: string) {
  //   this.jwtToken = token;
  //   console.log(this.jwtToken);
  // }

  // getToken(){
  //   return localStorage.getItem('jwtToken');
  // }

  // showToken(){
  //   return this.jwtToken;
  // }

  constructor(private http:HttpClient) {
    this.jwtToken=localStorage.getItem('jwtToken')

   }

  postDepartment(data: any): Observable<any> {

    const url = `${this.baseUrl}/Departments`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.jwtToken}`
    }
    
    );

    return this.http.post<any>(url, data, { headers });
  }


  getDepartment(): Observable<any> {
 
    const url = `${this.baseUrl}/Departments`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.jwtToken}`
    });

    return this.http.get(url,{headers});
    }


    putDepartment(data:any,id:number): Observable<any> {
      const url = `${this.baseUrl}/Departments/${id}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwtToken}`
      });

      return this.http.put<any>(url,data,{headers})

    }
     
    deleteDepartment(id:number): Observable<any>{
      const url = `${this.baseUrl}/Departments/${id}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwtToken}`
      });
     
      return this.http.delete<any>(url,{headers})
    }



}
