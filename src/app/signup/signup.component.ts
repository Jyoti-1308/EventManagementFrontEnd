import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignupService } from '../../ApiServices/signup/signup.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    public dialogRef: MatDialogRef<SignupComponent>,
    public dialogref: MatDialog) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm);
      const { username, password, role } = this.userForm.value;
      this.signupService.signUp(username, password, role).subscribe({
        next: (response: any) => {
          if(!response.id){
            alert("Username exists:Re open the registration form");
          }
          else{
            this.dialogRef.close();
            alert("user created successfully");
           
          }
        },
        error: (error: any) => {
        
          console.log(error)
          alert('server error');
          this.dialogRef.close();
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
