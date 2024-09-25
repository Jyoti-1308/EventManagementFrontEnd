import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = 'http://localhost:8080/signup'; // Replace with your backend URL

  constructor(private http: HttpClient) {}
  signUp(username: string, password: string,role:string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password ,role});
  }
}
