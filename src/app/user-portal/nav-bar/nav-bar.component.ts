
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ApiServiceService } from 'app/api-service.service';
import * as fromGetUser from 'app/state/selector/get-user.selectors';
import { CurrentUser } from 'app/CurrentUser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  active = 1;
  private readonly notifier: NotifierService ;
  private ngUnsubscribe: Subject<any> = new Subject();
  public currUser!: string;
  public isMenuCollapsed = true;
  constructor(private apiService: ApiServiceService,
              private router: Router,
              notifierService: NotifierService,
              private titleService: Title,
              private store: Store
              ) {
                  this.notifier = notifierService;
               }

  ngOnInit(): void {
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      currUser => this.currUser = currUser.response.firstName
    );
  }

  logout(): void {
    this.apiService.loggedOut()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      console.log('POST Request is successful', data);
      this.notifier.notify('success', 'logout successfully');
      localStorage.setItem('userBlog', '');
      localStorage.setItem('allUsers', '');
      this.router.navigateByUrl('/entry/login');
    }, () => {
        // this.notifier.notify('error', 'unable to logout');
        this.notifier.notify('success', 'logout successfully');
        localStorage.setItem('userBlog', '');
        localStorage.setItem('allUsers', '');
        this.router.navigateByUrl('/entry/login');
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
