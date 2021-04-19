import { Action } from '@ngrx/store';

import { CurrentUser } from 'app/CurrentUser';

export enum GetUserActionTypes {
  LoadGetUsers = '[GetUser] Load GetUsers',
  LoadGetUsersSuccess = '[GetUser] Load GetUsers Success',
  LoadGetUsersFailure = '[GetUser] Load GetUsers Failure',
}

export class LoadGetUsers implements Action {
  readonly type = GetUserActionTypes.LoadGetUsers;
}

export class LoadGetUsersSuccess implements Action {
  readonly type = GetUserActionTypes.LoadGetUsersSuccess;
  constructor(public payload: { data: CurrentUser }) { }
}

export class LoadGetUsersFailure implements Action {
  readonly type = GetUserActionTypes.LoadGetUsersFailure;
  constructor(public payload: { error: string }) { }
}

export type GetUserActions = LoadGetUsers | LoadGetUsersSuccess | LoadGetUsersFailure;

