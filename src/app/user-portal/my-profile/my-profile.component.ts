import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiServiceService } from 'app/api-service.service';
import * as getUserActions from 'app/state/action/get-user.actions';
import * as fromGetUser from 'app/state/selector/get-user.selectors';
import { CurrentUser } from  'app/CurrentUser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {

	private readonly notifier: NotifierService;
	currUser!: CurrentUser;
	public show: boolean = true;
  private ngUnsubscribe: Subject<any> = new Subject();

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
  	firstName: [''],
  	lastName: [''],
  	emailId: ['']
  })

  ngOnInit(): void {
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      currUser => {
        console.log(currUser);
        this.currUser = currUser;
      }
    )
    this.editForm.setValue({
      firstName: this.currUser.response.firstName,
      lastName: this.currUser.response.lastName,
      emailId: this.currUser.response.emailId
    })
  }

  backToHome() {
  	this.router.navigateByUrl('/user-portal/home');
  }

  toggle() {
  	this.show = !this.show;
  }
  
  update() {
  	this.apiService.updateUser(this.editForm.value)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
  		console.log(data);
  		this.notifier.notify('success','Updation successfully');
      this.store.dispatch(new getUserActions.LoadGetUsers());

      this.toggle();
  	},() => this.notifier.notify('error','Unable to update'));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
}
