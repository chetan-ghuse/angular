import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap,map,catchError,switchMap } from 'rxjs/operators';	

import * as usersBlogActions from './users-blog.actions';
import { LoadUsersBlogsLikes } from './users-blog.actions';
import { ApiServiceService } from './api-service.service';

@Injectable() 
export class UsersBlogEffects {

  constructor(private actions$: Actions,
		  			  private apiService: ApiServiceService
		  				) {}

  @Effect()
  loadUsersBlog$: Observable<Action> = this.actions$.pipe(
  	ofType(usersBlogActions.UsersBlogActionTypes.LoadUsersBlogs),
  	mergeMap(
  		action => this.apiService.allUsersBlog().pipe(
  			map(usersBlog => (new usersBlogActions.LoadUsersBlogsSuccess({ data: usersBlog.response }))),
  			catchError(err => of(new usersBlogActions.LoadUsersBlogsFailure({ error: err })))
  		)
  	)
  )

  @Effect()
  loadUsersBlogLikes$: Observable<Action> = this.actions$.pipe(
  	ofType<LoadUsersBlogsLikes>
  		(usersBlogActions.UsersBlogActionTypes.LoadUsersBlogsLikes),
  		switchMap(
  		action => this.apiService.addLikes(action.payload).pipe(
  			map(usersBlog => (new usersBlogActions.LoadUsersBlogs()))
  		)
  	)
  )
  
}
