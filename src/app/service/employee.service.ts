import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Make sure these imports are correct
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class EmployeeApiService {

  private baseUrl = 'http://localhost:8007/api';
  public  jwtToken !: string | null;


  constructor(private http: HttpClient) { 
   this.jwtToken=localStorage.getItem('jwtToken')

  }

    postEmployee(data: any): Observable<any> {

      const url = `${this.baseUrl}/Employees`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwtToken}`
      });

      return this.http.post<any>(url, data, { headers });
    }

  getEmployee(): Observable<any> {
 
    const url = `${this.baseUrl}/Employees`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.jwtToken}`
    });

    return this.http.get(url,{headers});
    }

    putEmployee(data:any,id:number): Observable<any> {
      const url = `${this.baseUrl}/Employees/${id}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwtToken}`
      });

      return this.http.put<any>(url,data,{headers})

    }
     
    deleteEmployee(id:number): Observable<any>{
      const url = `${this.baseUrl}/Employees/${id}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.jwtToken}`
      });
     
      return this.http.delete<any>(url,{headers})
    }



}
