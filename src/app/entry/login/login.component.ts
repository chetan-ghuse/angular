
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

import { NotifierService } from 'angular-notifier';
import { User } from 'app/user';
import { ApiServiceService } from 'app/api-service.service';
import { loginUser } from 'app/loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  title = 'Login!';
  emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  private ngUnsubscribe: Subject<loginUser> = new Subject();

  get emailId() {
    return this.loginForm.get('emailId')!;
  }
  
  get password() {
    return this.loginForm.get('password')!;
  }
  
  private readonly notifier: NotifierService;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private apiService: ApiServiceService, 
              notifierService: NotifierService,
              private titleService: Title) { 
                this.notifier = notifierService;
                this.titleService.setTitle('Login');
              }
  
  

  loginForm = this.fb.group({
    emailId: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(7)]]
  });

  

  ngOnInit(): void {
    localStorage.setItem('authKey','');
    localStorage.setItem('currentUser','');
    localStorage.setItem('password','');
  }
  
  onLogin() {
    const newUser: User = { ...this.loginForm.value } ;
    this.apiService.loggedIn(newUser)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {             
      localStorage.setItem('authKey',JSON.stringify(data['msg']));
      this.notifier.notify('success','Logged in Successfully!');
      localStorage.setItem('password',this.loginForm.value.password);
      this.router.navigateByUrl('/user-portal/home');
      }, () => this.notifier.notify('error','emailId or password is invalid! '));
   }

   ngOnDestroy(): void {
   	this.ngUnsubscribe.next();
   	this.ngUnsubscribe.complete();
   }

}






