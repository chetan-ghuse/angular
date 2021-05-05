import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DataSource } from '@angular/cdk/collections';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiServiceService } from 'app/shared/services/api-service.service';
import * as UsersBlogActions from 'app/state/action/users-blog.actions';
import * as fromUsersBlog from 'app/state/selector/users-blog.selectors';

@Component({
  selector: 'app-users-blog',
  templateUrl: './users-blog.component.html',
  styleUrls: ['./users-blog.component.scss']
})
export class UsersBlogComponent implements OnInit, OnDestroy {

  allUsersBlog: Array<any> = [];
  blogLikes: Array<any> = [];
  blogComments: Array<any> = [];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private apiService: ApiServiceService,
    private titleService: Title,
    private store: Store
  ) {
    this.titleService.setTitle('All blogs');
   }

  ngOnInit(): void {
    this.store.dispatch(new UsersBlogActions.LoadUsersBlogs());

    this.store.pipe(
      select(fromUsersBlog.getUsersBlog),
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(
      usersBlog => {
        this.allUsersBlog = usersBlog;
      }
    );
  }

  getLikes(index: number): void {
    this.blogLikes = this.allUsersBlog[index]['likeItems'];
  }

  getComments(index: number): void {
    this.blogComments = this.allUsersBlog[index]['commentItems'];
  }

  updateLikes(blogId: number): void {
    this.store.dispatch(new UsersBlogActions.LoadUsersBlogsLikes(blogId));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
