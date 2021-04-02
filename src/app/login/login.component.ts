import { Observable } from 'rxjs';

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

  title = "Welcome!";
  emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  userBlog: Array<any> = [];
  private readonly notifier: NotifierService ;
  currentUser = this.apiService.currUser;

  constructor(private fb: FormBuilder, private router: Router,
              private apiService: ApiServiceService, notifierService: NotifierService) { 
                this.notifier = notifierService;
              }
  
  

  loginForm = this.fb.group({
    emailId: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(7)]]
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
                      const obj:any = data;
                      //console.log("login successfull", obj['msg']);
                      this.apiService.getBlog(obj['msg'])
                      .subscribe(bdata => {
                        //console.log("get block successfully", bdata["response"]);
                        this.userBlog = bdata["response"];
                        localStorage.setItem('userBlog', JSON.stringify(this.userBlog));
                      },
                      error => {
                        console.log("Error",error);
                      });
                      this.notifier.notify('success','Logged in Successfully!');
                      this.router.navigateByUrl('/home');
                    },
                    error => {
                      this.notifier.notify('error','emailId or password is invalid! ');
                      console.log("Error",error);
                    });
    }

}






