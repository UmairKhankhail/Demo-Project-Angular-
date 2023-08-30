import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  private baseUrl = 'http://localhost:8007/api';
 
  private jwtToken!:string |null;
  constructor(private http:HttpClient) { 
    this.jwtToken = localStorage.getItem('jwtToken');

  }

  
  postCompany(data: any): Observable<any> {

     const url = `${this.baseUrl}/Companies`;
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.jwtToken}`
    // });

    return this.http.post<any>(url, data);
  }


  postLogin(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/Users`;
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.jwtToken}`
    // });

    // Build query parameters
    let params = new HttpParams();
    params = params.append('userName', email);
    params = params.append('password', password);

    return this.http.post<any>(url, null, {  params });
  }

  logout(){
    const url = `${this.baseUrl}/Users/logout`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.jwtToken}`
    });

      return this.http.get<any>(url, { headers });
  }

 }
