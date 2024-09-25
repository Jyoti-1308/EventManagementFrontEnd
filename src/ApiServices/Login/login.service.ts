// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/login'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string,role:string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password ,role});
  }
  

 
}