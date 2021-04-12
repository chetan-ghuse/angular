
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiServiceService, private router: Router) {

  }
  canActivate(): boolean {
    if(this.apiService.loggedInUser()) {
      this.apiService.getCurrUser().subscribe(data => {
        console.log(data);
        return true;
      },() => {
          this.router.navigate(['/login']);
          return false;
      });
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    } 
  }

}
