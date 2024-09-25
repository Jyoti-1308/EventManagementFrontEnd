import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../ApiServices/Login/login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private loginService: LoginService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required] // Correctly set up
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password, role } = this.loginForm.value;

      // Call the login service
      this.loginService.login(username, password, role).subscribe({
        next: (response: any) => {
          // Handle success
          console.log(response);
          if (!response) {
            this.dialogRef.close();
            alert(`No such ${role} exists`);

          }
          else {
           
            this.authService.login(response);
            this.dialogRef.close();
            alert('Login successful!');
            if (role === 'admin'){
              this.router.navigate(['/admindashboard']);
            }
            else {
              this.router.navigate([`/userProfile/${username}`]);
            }
          }


        },
        error: (error: any) => {
          // Handle error
          console.log(error)
          alert('Invalid username or password');
          this.dialogRef.close();

        }
      });
    }
  }

}