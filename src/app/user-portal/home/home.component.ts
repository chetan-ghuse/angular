
import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AddBlogComponent } from '../add-blog/add-blog.component';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import * as fromGetUser from 'app/state/selector/get-user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {
  public currUser!: any;
  currUserBlog: Array<any> = [];
  blogData!: any;
  private ngUnsubscribe: Subject<any> = new Subject();
  

  constructor(
    private apiService: ApiServiceService,
    private notifierService: NotifierService,
    private titleService: Title,
    private modalService: NgbModal,
    private store: Store,
    private cd: ChangeDetectorRef
  ) {
    this.titleService.setTitle('Home');
  }

  ngOnInit(): void {
    this.store.pipe(select(fromGetUser.getCurrentUser)).subscribe(
      (currUser) => {
        this.currUser = currUser;
        this.getUserBlog();
    });
  }
  ngOnChanges(): void {
    this.cd.detectChanges();
  }

  getUserBlog(): void {
    this.apiService.getBlog()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(bdata => {
      this.currUserBlog = bdata['response'];
      this.currUserBlog.forEach(row => {
        row['user'] = this.currUser.response;
      });
    }); 
  }

  deleteBlog(id: number): void {
    this.apiService.removeBlog(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.notifierService.notify('success', 'Blog deleted');
      this.getUserBlog();
    }, () => this.notifierService.notify('error', 'Sorry unable to delete'));
  }

  open(): void {
    const modalRef = this.modalService.open(AddBlogComponent);
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        this.apiService.createBlog(result)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
        this.notifierService.notify('success', 'Blog added successfully');
        this.getUserBlog();
        }, () => this.notifierService.notify('error', 'Sorry blog is not added'));
      }
    });
  }

  editBlog(currBlog: any) {
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
        this.blogData = result;
        this.blogData['blogId'] = currBlog.id;
        this.apiService.updateBlog(this.blogData)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
        this.notifierService.notify('success', 'Blog updated successfully');
        this.getUserBlog();
        }, () => this.notifierService.notify('error', 'Sorry blog is not updated'));
      }
    });
  }

  updateLikes(blogId: number): void {
    this.apiService.addLikes(blogId)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      if (data.msg === 'Like entry added') {
      this.notifierService.notify('success', 'Like added successfully');
      } else if (data.msg === 'Like Deleted') {
          this.notifierService.notify('success', 'Like removed successfully');
        }
      this.getUserBlog();
    }, () => this.notifierService.notify('error', 'Like is not added'));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
