import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  title = "Join Now!"
  constructor(private fb: FormBuilder) { }
  userSignUp = this.fb.group({
    fname: ['',[Validators.required, Validators.minLength(2)]],
    lname: ['',[Validators.required, Validators.minLength(2)]],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  get fname() {
    return this.userSignUp.get('fname')!;
  }
  get lname() {
    return this.userSignUp.get('lname')!;
  }
  get email() {
    return this.userSignUp.get('email')!;
  }
  get password() {
    return this.userSignUp.get('password')!;
  }
  ngOnInit(): void {
  }

}
