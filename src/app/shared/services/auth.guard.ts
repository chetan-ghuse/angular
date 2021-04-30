
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import{ Store, select } from '@ngrx/store';

import { ApiServiceService } from './api-service.service';
import * as getUserActions from 'app/state/action/get-user.actions';

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
      this.store.dispatch(new getUserActions.LoadGetUsers());
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    } 
  }

}
