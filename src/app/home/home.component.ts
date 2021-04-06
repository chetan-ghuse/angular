
import { Component, OnInit } from '@angular/core';

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
  currentUser = this.apiService.currUser;
  currUserBlog: Array<any> = [];

  constructor(private router: Router, private apiService: ApiServiceService, 
              notifierService: NotifierService) { 
    this.notifier = notifierService;
    this.currUserBlog = JSON.parse(localStorage.getItem('userBlog')!);
      console.log(this.currUserBlog);
  }

  ngOnInit(): void {
    this.getUserBlog();
  }
  getUserBlog() {
  this.apiService.getBlog()
                      .subscribe(bdata => {
                        //console.log("get block successfully", bdata["response"]);
                        this.currUserBlog = bdata["response"];
                        localStorage.setItem('userBlog', JSON.stringify(this.currUserBlog));
                      },
                      error => {
                        console.log("Error",error);
                      });
  }
  deleteBlog(blogId:number) {
    //console.log(blogId);
    const id: blogId = { blogId } as unknown as blogId ;
    //console.log(id);
    this.apiService.removeBlog(id)
                    .subscribe(data => {
                      console.log('Deleted Successfully', data);
                      this.notifier.notify('success','Blog deleted'); 
                      this.getUserBlog();
                    },
                    error => {
                      console.log("Error",error);
                      this.notifier.notify('error','Sorry unable to delete');
                    });

  }
  navigate() {
    this.router.navigateByUrl('/addBlog');
  }
}
