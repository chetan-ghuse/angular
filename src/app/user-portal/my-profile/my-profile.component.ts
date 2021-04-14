import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { ApiServiceService } from 'app/api-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent  {

	private readonly notifier: NotifierService;
	currUser = JSON.parse(localStorage.getItem('currentUser')!);
	public show: boolean = true;
  constructor(private fb: FormBuilder,
  						private apiService: ApiServiceService,
  						private titleService: Title,
  						notifierService: NotifierService,
  						private router: Router) { 
  	this.titleService.setTitle('Profile');
  	this.notifier = notifierService;
  }

  editForm = this.fb.group({
  	firstName: [this.currUser.firstName],
  	lastName: [this.currUser.lastName],
  	emailId: [this.currUser.emailId]
  })

  backToHome() {
  	this.router.navigateByUrl('/user-portal/home');
  }

  toggle() {
  	this.currUser = JSON.parse(localStorage.getItem('currentUser')!);
  	this.show = !this.show;
  }
  
  update() {
  	this.apiService.updateUser(this.editForm.value).subscribe((data) => {
  		console.log(data);
  		this.notifier.notify('success','Updation successfully');
  		 this.apiService.getCurrUser().subscribe(data => {
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data.response));
        this.toggle();
      },() => this.toggle());
  		//this.router.navigateByUrl('/home');
  	},() => this.notifier.notify('error','Unable to update'));
  }
}
