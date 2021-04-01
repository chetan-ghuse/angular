
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';

import { User } from './../user';
import { ApiServiceService } from './../api-service.service';
//import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  
})
export class SignUpComponent implements OnInit {
  title = "Join Now!";
  emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  private readonly notifier: NotifierService ;
  

  constructor(private fb: FormBuilder, private router: Router, 
              private apiService: ApiServiceService, notifierService: NotifierService) { 
                this.notifier = notifierService;
              }
  userSignUp = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    emailId: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
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
    
    let currentPassword = this.userSignUp.value.password;
    currentPassword = currentPassword.trim();
      if (/\d/.test(currentPassword) && /[A-Z]/.test(currentPassword) && /[a-z]/.test(currentPassword) && /[^A-Za-z0-9]/.test(currentPassword) && currentPassword.length >= 7) {
        this.addCurrentUser();
        
      } else {
        //alert("Password must have atleast one Capital letter, one small letter, one digit, one special character and must have a length of 7 characters");
        this.notifier.notify('error', 'Invalid password')
      }
  }

  addCurrentUser() {
      const currentUser = this.userSignUp.value;
      const newUser: User = { currentUser } as unknown as User;
      //console.log(currentUser);
      this.apiService.addUser(newUser)
                        .subscribe(data => {

                          console.log("POST Request is successful ", data);
                          this.notifier.notify('success', 'User added successfully');
                          this.router.navigateByUrl('/login');
                          },
                         error => {
                          this.notifier.notify('error', 'Provided user already exist');
                          console.log("Error", error);
                          //alert("Provided user already exist");
                         
                          });
  }

}

