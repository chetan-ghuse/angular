
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import{ Store, select } from '@ngrx/store';

import { ApiServiceService } from './api-service.service';
import * as getUserActions from 'app/state/action/get-user.actions';
//import * as fromGetUser from './get-user.selectors';
import { CurrentUser } from './CurrentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiServiceService, 
              private router: Router,
              private store: Store
             ) { }
  canActivate(): boolean {
    if(this.apiService.loggedInUser()) {
      /*this.apiService.getCurrUser().subscribe(data => {
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data.response));
        return true;
      },() => {
          this.router.navigate(['/login']);
          return false;
      });*/
      this.store.dispatch(new getUserActions.LoadGetUsers());
      console.log(this.store.dispatch(new getUserActions.LoadGetUsers()));
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    } 
  }

}
