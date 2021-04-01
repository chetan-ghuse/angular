
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { User } from './../user';
import { ApiServiceService } from './../api-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = "Welcome!";
  emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  constructor(private fb: FormBuilder, private router: Router,
              private apiService: ApiServiceService) { }
  
  currentUser = this.apiService.currUser;

  loginForm = this.fb.group({
    emailId: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    password: ['', Validators.required]
  });

  get emailId() {
    return this.loginForm.get('emailId')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  ngOnInit(): void {
  }
  
  onLogin() {
    const currentUser = this.loginForm.value;
    console.log(currentUser);
    const newUser: User = { currentUser } as unknown as User;
    this.apiService.loggedIn(newUser) 
                    .subscribe(data => {
                      console.log("login successfull", data);
                      this.router.navigateByUrl('/home');
                    },
                    error => {
                      console.log("Error",error);
                    }
                    
                    );
    }

}




