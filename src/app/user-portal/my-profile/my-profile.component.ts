import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiServiceService } from 'app/shared/services/api-service.service';
import * as getUserActions from 'app/state/action/get-user.actions';
import * as fromGetUser from 'app/state/selector/get-user.selectors';
import { CurrentUser } from 'app/shared/interfaces/CurrentUser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  public show = true;
  private ngUnsubscribe: Subject<any> = new Subject();
  currUser!: CurrentUser;

  editForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    emailId: ['']
  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private titleService: Title,
    private notifierService: NotifierService,
    private router: Router,
    private store: Store
  ) {
    this.titleService.setTitle('Profile');
  }

  

  ngOnInit(): void {
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      currUser => {
        this.currUser = currUser;
      }
    );
    this.editForm.setValue({
      firstName: this.currUser.response.firstName,
      lastName: this.currUser.response.lastName,
      emailId: this.currUser.response.emailId
    });
  }

  backToHome(): void {
    this.router.navigateByUrl('/user-portal/home');
  }

  toggle(): void {
    this.show = !this.show;
  }

  update(): void {
    this.apiService.updateUser(this.editForm.value)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      this.notifierService.notify('success', 'Updation successfully');
      this.store.dispatch(new getUserActions.LoadGetUsers());
      this.toggle();
    }, () => this.notifierService.notify('error', 'Unable to update'));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
