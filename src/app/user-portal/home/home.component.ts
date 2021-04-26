
import { Component, OnInit, OnDestroy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AddBlogComponent } from '../add-blog/add-blog.component';
import { ApiServiceService } from 'app/api-service.service';
import * as fromGetUser from 'app/state/selector/get-user.selectors';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {
  private readonly notifier: NotifierService ;
  currUserBlog: Array<any> = [];
  blogLikes: Array<any> = [];
  blogComments: Array<any> = [];
  blogId!: number;
  blogData!: any;
  private ngUnsubscribe: Subject<any> = new Subject();
  tableDataSource$: any;
  displayedColumns!: string[];
  displayedColumnsRow2!: string[];
  public currUser!: string;
  public controlRow: Array<any> = [] ;

  constructor(private router: Router,
              private apiService: ApiServiceService,
              notifierService: NotifierService,
              private titleService: Title,
              private modalService: NgbModal,
              private store: Store,
              private cd: ChangeDetectorRef
              ) {
                this.notifier = notifierService;
                this.titleService.setTitle('Home');
              }

  ngOnInit(): void {
    this.getUserBlog();
    this.currUserBlog = JSON.parse(localStorage.getItem('userBlog')!);
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      currUser => this.currUser = currUser.response.firstName
    );
    this.currUserBlog.forEach(row => {
      this.controlRow.push({
        isCollapsed: true
      })
    });
    this.tableDataSource$ = new BehaviorSubject(this.currUserBlog);
    this.displayedColumns = [
      'user',
      'title',
      'description',
      'content',
      'likeAndComment',
      'image',
      'createdAt',
      'delete'
    ];
    this.displayedColumnsRow2 = [
      'titleRow2',
    ];
    
  }

  ngOnChanges(): void {
    console.log('OnChanges');
    this.cd.detectChanges();
  }

  getUserBlog(): void {
    this.apiService.getBlog()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(bdata => {
      this.currUserBlog = bdata['response'];
      localStorage.setItem('userBlog', JSON.stringify(this.currUserBlog));
      this.tableDataSource$.next(this.currUserBlog);
      this.currUserBlog.forEach(row => {
        this.controlRow.push({
          isCollapsed: true
        })
      });
    });
  }

  deleteBlog(): void {
    this.apiService.removeBlog(this.blogId)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.notifier.notify('success', 'Blog deleted');
      this.getUserBlog();
    }, () => this.notifier.notify('error', 'Sorry unable to delete'));
  }

  getBlogId(id: number, content: any): void {
    this.blogId = id;
    this.modalService.open(content, { centered: true });
  }

  getLikes(index: number): void {
    this.blogLikes = this.currUserBlog[index]['likeItems'];
  }

  getComments(index: number): void {
    this.blogComments = this.currUserBlog[index]['commentItems'];
  }

  open(): void {
    const modalRef = this.modalService.open(AddBlogComponent);
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
        this.blogData = result;
        this.apiService.createBlog(result)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
        this.notifier.notify('success', 'Blog added successfully');
        this.getUserBlog();
        }, () => this.notifier.notify('error', 'Sorry blog is not added'));
      }
    });
  }

  increaseLikes(blogId: number): void {
    this.apiService.addLikes(blogId)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      if (data.msg === 'Like entry added') {
      this.notifier.notify('success', 'Like added successfully');
      } else if (data.msg === 'Like Deleted') {
          this.notifier.notify('success', 'Like removed successfully');
      }
      this.getUserBlog();
    }, () => this.notifier.notify('error', 'Like is not added'));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
