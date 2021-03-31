
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { User } from './user';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SignUpService]
})
export class SignUpComponent implements OnInit {
  title = "Join Now!";

  constructor(private fb: FormBuilder, private router: Router, private signUpService: SignUpService) { }
  userSignUp = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    emailId: ['', Validators.required],
    password: ['', Validators.required]
  });

  get firstName() {
    return this.userSignUp.get('firstName')!;
  }
  get lastName() {
    return this.userSignUp.get('lastName')!;
  }
  get emailId() {
    return this.userSignUp.get('emailId')!;
  }
  get password() {
    return this.userSignUp.get('password')!;
  }
  ngOnInit(): void {
  }
  validation() {
    let currentFname = this.userSignUp.value.firstName;
    let currentLname = this.userSignUp.value.lastName;
    let currentPassword = this.userSignUp.value.password;
    let currentEmail = this.userSignUp.value.emailId;
    
    currentFname = currentFname.trim();
    currentLname = currentLname.trim();
    currentPassword = currentPassword.trim();
    currentEmail = currentEmail.trim();

    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(currentEmail)) {
      if (/\d/.test(currentPassword) && /[A-Z]/.test(currentPassword) && /[a-z]/.test(currentPassword) && /[^A-Za-z0-9]/.test(currentPassword) && currentPassword.length >= 7) {
        this.addCurrentUser();
        
      } else {
        alert("Password must have atleast one Capital letter, one small letter, one digit, one special character and must have a length of 7 characters");
      }
    } else {
      alert("Email is invalid");
    }
    
  }

  addCurrentUser() {
      const currentUser = this.userSignUp.value;
      const newUser: User = { currentUser } as unknown as User;
      console.log(currentUser);
      this.signUpService.addUser(newUser)
                        .subscribe(data => {

                          console.log("POST Request is successful ", data);
                          this.router.navigateByUrl('/login');
                          },
                         error => {
                         
                          console.log("Error", error);
                          alert("Provided user already exist");
                         
                          });
  }

}

