
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

import { ApiServiceService } from 'app/api-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  active = 1;
  private readonly notifier: NotifierService ;
  constructor(private apiService: ApiServiceService,
              private router: Router,
              notifierService: NotifierService,
              private titleService: Title) {
                this.notifier = notifierService;
               }

  logout() {
    this.apiService.loggedOut().subscribe(data => {
      console.log("POST Request is successful ", data);
      this.notifier.notify('success', 'logout successfully');
      localStorage.setItem('userBlog','');
      localStorage.setItem('allUsers','');
      this.router.navigateByUrl('/entry/login');
    }, () => {
        //this.notifier.notify('error', 'unable to logout');
        this.notifier.notify('success', 'logout successfully');
        localStorage.setItem('userBlog','');
        localStorage.setItem('allUsers','');
        this.router.navigateByUrl('/entry/login');
    });
  }
  

}
