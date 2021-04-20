
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from 'app/user';
import { ApiServiceService } from 'app/api-service.service';
import { forbiddenSpaceValidator } from 'app/shared/space.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  
})
export class SignUpComponent implements OnDestroy {
  title = 'Sign Up!';
  emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  private readonly notifier: NotifierService ;
  private ngUnsubscribe: Subject<any> = new Subject();
  
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

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private apiService: ApiServiceService, 
              notifierService: NotifierService,
              private titleService: Title) { 
                this.notifier = notifierService;
                this.titleService.setTitle('Sign Up');
              }
  userSignUp = this.fb.group({
    firstName: ['', 
      [
        Validators.required, 
        Validators.minLength(2), 
        forbiddenSpaceValidator
      ]
    ],
    lastName: ['', 
      [
        Validators.required, 
        Validators.minLength(2), 
        forbiddenSpaceValidator
      ]
    ],
    emailId: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(7)]]
  });

  addCurrentUser() {
    const newUser: User = { ...this.userSignUp.value } ;
    this.apiService.addUser(newUser)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      console.log('POST Request is successful ', data);
      this.notifier.notify('success', 'User added successfully');
      this.router.navigateByUrl('/entry/login');
      }, () => this.notifier.notify('error', 'Provided user already exist'));
  }

  ngOnDestroy(): void {
     this.ngUnsubscribe.next();
     this.ngUnsubscribe.complete();
  }
}

