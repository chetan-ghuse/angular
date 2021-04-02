import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { ApiServiceService } from './../api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly notifier: NotifierService ;
  currentUser = this.apiService.currUser;
  currUserBlog: Array<any> = [];

  constructor(private router: Router, private apiService: ApiServiceService, 
              notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

  ngOnInit(): void {
   
      
       this.currUserBlog = JSON.parse(localStorage.getItem('userBlog')!);
       console.log(this.currUserBlog);

  }
  navigate() {
    this.router.navigateByUrl('/addBlog');
  }
}
