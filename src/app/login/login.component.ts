
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { User } from './../user';
import { ApiServiceService } from './../api-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = "Login!";
  emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  get emailId() {
    return this.loginForm.get('emailId')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }
  
  private readonly notifier: NotifierService ;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private apiService: ApiServiceService, 
              notifierService: NotifierService) { 
                this.notifier = notifierService;
              }
  
  

  loginForm = this.fb.group({
    emailId: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(7)]]
  });

  

  ngOnInit(): void {
    localStorage.setItem('authKey','');
  }
  
  onLogin() {
    const newUser: User = { ...this.loginForm.value } ;
    this.apiService.loggedIn(newUser).subscribe(data => {             
      localStorage.setItem('authKey',JSON.stringify(data['msg']));
      this.notifier.notify('success','Logged in Successfully!');
      this.router.navigateByUrl('/home');
      }, () => this.notifier.notify('error','emailId or password is invalid! '));
    }

}






