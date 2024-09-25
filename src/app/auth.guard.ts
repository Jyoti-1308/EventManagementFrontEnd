import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      
      return true; // Allow access if logged in and is admin
    } else {
      this.router.navigate(['/home']); // Redirect to login if not authorized
      return false; // Prevent access
    }
  }
}



