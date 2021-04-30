
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ApiServiceService } from 'app/shared/services/api-service.service';
import * as fromGetUser from 'app/state/selector/get-user.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  active = 1;
  public currUser!: string;
  /*public isMenuCollapsed = true;*/
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private notifierService: NotifierService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      currUser => this.currUser = currUser.response.firstName
    );
  }

  logout(): void {
    this.apiService.loggedOut()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(data => {
      this.notifierService.notify('success', 'logout successfully');
      localStorage.setItem('userBlog', '');
      localStorage.setItem('allUsers', '');
      this.router.navigateByUrl('/entry/login');
    }, () => {
      this.notifierService.notify('success', 'logout successfully');
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
