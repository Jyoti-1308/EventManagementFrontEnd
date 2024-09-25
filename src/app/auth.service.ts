import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUserObj = new BehaviorSubject(null);
  authUser = this.authUserObj.asObservable();
  constructor(private router:Router) { }
  setAuthUser(message: any) {
    this.authUserObj.next(message)
  }
  login(response:any) {
    
    localStorage.setItem('loginInfo', JSON.stringify(response));
    this.setAuthUser(response);
    
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loginInfo');
  }

  // Optional: Method to check user role
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('loginInfo') || '{}');
    
    return user.role === 'admin';
  }
  logout(){
    localStorage.removeItem("loginInfo");
    this.setAuthUser("");
    this.router.navigate(['./home']);
  }
}
