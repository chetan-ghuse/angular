import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiServiceService } from 'app/api-service.service';
import { NotifierService } from 'angular-notifier';
import * as UsersBlogActions from 'app/state/action/users-blog.actions';
import * as fromUsersBlog from 'app/state/selector/users-blog.selectors';
import { AllUsersBlog } from 'app/AllUsersBlog';

@Component({
	selector: 'app-users-blog',
	templateUrl: './users-blog.component.html',
	styleUrls: ['./users-blog.component.scss']
})
export class UsersBlogComponent implements OnInit, OnDestroy {

	allUsersBlog: Array<any> = [];
	blogLikes: Array<any> = [];
	blogComments: Array<any> = [];
	private readonly notifier: NotifierService ;
	private ngUnsubscribe: Subject<any> = new Subject();

	constructor(private apiService: ApiServiceService,
							private titleService: Title,
							notifierService: NotifierService,
							private store: Store
							) {
								this.titleService.setTitle('All blog');
								this.notifier = notifierService;
							 }

	ngOnInit(): void {
		this.store.dispatch(new UsersBlogActions.LoadUsersBlogs());

		this.store.pipe(
			select(fromUsersBlog.getUsersBlog),
			takeUntil(this.ngUnsubscribe)
		)
		.subscribe(
			usersBlog => this.allUsersBlog = usersBlog
		 )
	}

	getLikes(index: number) {
		this.blogLikes = this.allUsersBlog[index]['likeItems'];
	}

	getComments(index: number) {
		this.blogComments = this.allUsersBlog[index]['commentItems'];
	}

	increaseLikes(blogId: number) {
		this.store.dispatch(new UsersBlogActions.LoadUsersBlogsLikes(blogId));
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

}
