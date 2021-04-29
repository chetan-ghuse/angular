
import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AddBlogComponent } from '../add-blog/add-blog.component';
import { ApiServiceService } from 'app/api-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {

  private readonly notifier: NotifierService ;
  currUserBlog: Array<any> = [];
  blogId!: number;
  blogData!: any;
  private ngUnsubscribe: Subject<any> = new Subject();
  public currUser!: string;
  public controlRow: Array<any> = [];
  sortKey$ = new BehaviorSubject<string>('name');
  sortDirection$ = new BehaviorSubject<string>('asc');

  constructor(private router: Router,
              private apiService: ApiServiceService,
              notifierService: NotifierService,
              private titleService: Title,
              private modalService: NgbModal,
              private cd: ChangeDetectorRef
              ) {
                this.notifier = notifierService;
                this.titleService.setTitle('Home');
              }

  ngOnInit(): void {
    this.getUserBlog();
    this.currUserBlog = JSON.parse(localStorage.getItem('userBlog')!);
    /*combineLatest(this.sortKey$, this.sortDirection$)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(([sortKey, sortDirection]) => {
      const sortedBlog = this.currUserBlog.sort((a, b) => {
        console.log(sortKey);
        if (a[sortKey] > b[sortKey]) {
          return sortDirection === 'asc' ? 1 : -1;
         } 
        if (a[sortKey] < b[sortKey]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        return 0;
      });
      this.tableDataSource$.next(sortedBlog);
    });*/
  }

  /*adjustSort(key: string) {
    if (this.sortKey$.value === key) {
      if (this.sortDirection$.value === 'asc') {
        this.sortDirection$.next('desc');
      } else {
        this.sortDirection$.next('asc');
      }
      return
    }
    this.sortKey$.next(key);
    this.sortDirection$.next('asc');
  }
*/
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
      this.currUserBlog.forEach(row => {
        this.controlRow.push({
          isCollapsed: true
        })
      });
    });
  }

  deleteBlog(id: number): void {
    this.apiService.removeBlog(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.notifier.notify('success', 'Blog deleted');
      this.getUserBlog();
    }, () => this.notifier.notify('error', 'Sorry unable to delete'));
  }

  open(): void {
    const modalRef = this.modalService.open(AddBlogComponent);
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
        /*this.blogData = result;*/
        this.apiService.createBlog(result)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
        this.notifier.notify('success', 'Blog added successfully');
        this.getUserBlog();
        }, () => this.notifier.notify('error', 'Sorry blog is not added'));
      }
    });
  }

  openEditModal(currBlog: any) {
    const modalRef = this.modalService.open(AddBlogComponent);
    modalRef.componentInstance.titleBlog = 'Edit Blog!';
    modalRef.componentInstance.titleService.setTitle('Edit Blog');
    modalRef.componentInstance.blogForm.setValue({
      title: currBlog.title,
      description: currBlog.description,
      content: currBlog.content,
      visible: currBlog.visible
    });
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
        this.blogData = result;
        this.blogData['blogId'] = currBlog.id;
        this.apiService.updateBlog(this.blogData)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
        this.notifier.notify('success', 'Blog updated successfully');
        this.getUserBlog();
        }, () => this.notifier.notify('error', 'Sorry blog is not updated'));
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
