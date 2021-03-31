import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = "Welcome!";
  constructor(private fb: FormBuilder, private router: Router) { }

  loginForm = this.fb.group({
    emailId: ['', Validators.required],
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

}


