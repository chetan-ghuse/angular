
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { ApiServiceService } from './../api-service.service';
import { blogId } from './../blogId';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly notifier: NotifierService ;
  currUserBlog: Array<any> = [];

  constructor(private router: Router, 
              private apiService: ApiServiceService, 
              notifierService: NotifierService,
              private titleService: Title) { 
                this.notifier = notifierService;
                this.currUserBlog = JSON.parse(localStorage.getItem('userBlog')!);
                this.titleService.setTitle('Home');
              }

  ngOnInit(): void {
    this.getUserBlog();
  }
  getUserBlog() {
  this.apiService.getBlog().subscribe(bdata => {        
      this.currUserBlog = bdata["response"];
      localStorage.setItem('userBlog', JSON.stringify(this.currUserBlog));
    });
  }
  deleteBlog(blogId:number) {
    const id: blogId = { blogId };
    this.apiService.removeBlog(id).subscribe(() => {
      this.notifier.notify('success','Blog deleted'); 
      this.getUserBlog();
    }, () => this.notifier.notify('error','Sorry unable to delete'));

  }
  navigate() {
    this.router.navigateByUrl('/addBlog');
  }
}
