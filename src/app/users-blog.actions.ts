import { Action } from '@ngrx/store';

import { AllUsersBlog } from './AllUsersBlog';

export enum UsersBlogActionTypes {
  LoadUsersBlogs = '[UsersBlog] Load UsersBlogs',
  LoadUsersBlogsSuccess = '[UsersBlog] Load UsersBlogs Success',
  LoadUsersBlogsFailure = '[UsersBlog] Load UsersBlogs Failure',
}

export class LoadUsersBlogs implements Action {
  readonly type = UsersBlogActionTypes.LoadUsersBlogs;
}

export class LoadUsersBlogsSuccess implements Action {
  readonly type = UsersBlogActionTypes.LoadUsersBlogsSuccess;
  constructor(public payload: { data: AllUsersBlog[] }) { }
}

export class LoadUsersBlogsFailure implements Action {
  readonly type = UsersBlogActionTypes.LoadUsersBlogsFailure;
  constructor(public payload: { error: string }) { }
}

export type UsersBlogActions = LoadUsersBlogs | LoadUsersBlogsSuccess | LoadUsersBlogsFailure;

