
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotifierService } from 'angular-notifier';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { ApiServiceService } from './../api-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly notifier: NotifierService ;
  currUserBlog: Array<any> = [];
  blogLikes: Array<any> = [];
  blogComments: Array<any> = [];
  blogId!: number;
  display = "none";

  constructor(private router: Router, 
              private apiService: ApiServiceService, 
              notifierService: NotifierService,
              private titleService: Title,
              private modalService: NgbModal) { 
                this.notifier = notifierService;
                
                this.titleService.setTitle('Home');
              }

  ngOnInit(): void {
    this.getUserBlog();
    this.currUserBlog = JSON.parse(localStorage.getItem('userBlog')!);
  }
  getUserBlog() {
  this.apiService.getBlog().subscribe(bdata => {        
      this.currUserBlog = bdata["response"];
      localStorage.setItem('userBlog', JSON.stringify(this.currUserBlog));
    });
  }
  deleteBlog() {
    this.onCloseHandled();
    console.log(this.blogId);
    this.apiService.removeBlog(this.blogId).subscribe(() => {
      this.notifier.notify('success','Blog deleted'); 
      this.getUserBlog();
    }, () => this.notifier.notify('error','Sorry unable to delete'));

  }
  getBlogId(id: number, content: any) {
    this.blogId = id ;
    this.modalService.open(content, { centered: true });
  }
  onCloseHandled() {
    this.display = "none";
  }
  getLikes(index: number) {
    //console.log(index);
    this.blogLikes = this.currUserBlog[index]["likeItems"];
    //console.log(this.blogLikes);
  }
  getComments(index: number) {
    this.blogComments = this.currUserBlog[index]["commentItems"];
  }
  open () {
    this.modalService.open(AddBlogComponent);
  }
}
