import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import{ Store, select } from '@ngrx/store';

import { ApiServiceService } from 'app/api-service.service';
import * as getUserActions from 'app/get-user.actions';
import * as fromGetUser from 'app/get-user.selectors';
import { CurrentUser } from  'app/CurrentUser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

	private readonly notifier: NotifierService;
	currUser!: CurrentUser;
	public show: boolean = true;

  constructor(private fb: FormBuilder,
  						private apiService: ApiServiceService,
  						private titleService: Title,
  						notifierService: NotifierService,
  						private router: Router,
              private store: Store
              ) { 
  	this.titleService.setTitle('Profile');
  	this.notifier = notifierService;
  }

  editForm = this.fb.group({
  	firstName: [/*this.currUser.response.firstName*/],
  	lastName: [/*this.currUser.response.lastName*/],
  	emailId: [/*this.currUser.response.emailId*/]
  })

  ngOnInit(): void {
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      currUser => {
        console.log(currUser);
        this.currUser = currUser;
      }
    )
  }

  backToHome() {
  	this.router.navigateByUrl('/user-portal/home');
  }

  toggle() {
  	/*this.currUser = JSON.parse(localStorage.getItem('currentUser')!);*/
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      currUser => {
        console.log(currUser);
        this.currUser = currUser;
      }
    )
  	this.show = !this.show;
  }
  
  update() {
  	this.apiService.updateUser(this.editForm.value).subscribe((data) => {
  		console.log(data);
  		this.notifier.notify('success','Updation successfully');
  		 /*this.apiService.getCurrUser().subscribe(data => {
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data.response));*/
        this.store.dispatch(new getUserActions.LoadGetUsers());

        this.toggle();
  	},() => this.notifier.notify('error','Unable to update'));
  }
}
