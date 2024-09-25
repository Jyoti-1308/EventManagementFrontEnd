import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserObject } from '../modals/user';
import { Subscription } from 'rxjs';
// import { console } from 'inspector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  message:string="";
  subscription: Subscription = new Subscription();
  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService) { }
  userObject!: UserObject;
  openLoginModal() {
    this.dialog.open(LoginComponent);
  }
  openSignupModal() {
    this.dialog.open(SignupComponent);
  }
  ngOnInit(): void {
    this.checkLoginStatus();
    
  }
  checkLoginStatus() {
    
    this.subscription = this.authService.authUser.subscribe((userObject:any) => this.userObject = userObject)
  }
  userLogout() { 
    this.authService.logout();
    this.checkLoginStatus();

  }
}
