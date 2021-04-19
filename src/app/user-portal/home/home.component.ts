
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AddBlogComponent } from '../add-blog/add-blog.component';
import { ApiServiceService } from 'app/api-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly notifier: NotifierService ;
  currUserBlog: Array<any> = [];
  blogLikes: Array<any> = [];
  blogComments: Array<any> = [];
  blogId!: number;
  blogData!: any;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private router: Router, 
              private apiService: ApiServiceService, 
              notifierService: NotifierService,
              private titleService: Title,
              private modalService: NgbModal
              ) { 
                this.notifier = notifierService;
                this.titleService.setTitle('Home');
              }

  ngOnInit(): void {
    this.getUserBlog();
    this.currUserBlog = JSON.parse(localStorage.getItem('userBlog')!);
  }

  getUserBlog() {
    this.apiService.getBlog()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(bdata => {        
      this.currUserBlog = bdata['response'];
      localStorage.setItem('userBlog', JSON.stringify(this.currUserBlog));
    });
  }

  deleteBlog() {
    this.apiService.removeBlog(this.blogId)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.notifier.notify('success','Blog deleted'); 
      this.getUserBlog();
    }, () => this.notifier.notify('error','Sorry unable to delete'));
  }

  getBlogId(id: number, content: any) {
    this.blogId = id;
    this.modalService.open(content, { centered: true });
  }

  getLikes(index: number) {
    this.blogLikes = this.currUserBlog[index]['likeItems'];
  }

  getComments(index: number) {
    this.blogComments = this.currUserBlog[index]['commentItems'];
  }

  open() {
    const modalRef = this.modalService.open(AddBlogComponent);
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.blogData = result; 
        this.apiService.createBlog(result)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
        this.notifier.notify('success','Blog added successfully');
        this.getUserBlog();
      }, () => this.notifier.notify('error','Sorry blog is not added')); 
        }
    });
  }

  increaseLikes(blogId: number) {
    this.apiService.addLikes(blogId)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      if(data.msg == 'Like entry added') {
      this.notifier.notify('success','Like added successfully');
      } else if(data.msg == 'Like Deleted'){
          this.notifier.notify('success','Like removed successfully');
      }
      this.getUserBlog();
    },() => this.notifier.notify('error','Like is not added'));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
