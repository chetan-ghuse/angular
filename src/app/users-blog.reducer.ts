import { Action } from '@ngrx/store';

import { AllUsersBlog } from './AllUsersBlog';
import { UsersBlogActions, UsersBlogActionTypes } from './users-blog.actions'

export const usersBlogFeatureKey = 'usersBlogState';

export interface State {
	allUsersBlog: AllUsersBlog [],
	error: string
}

export const initialState: State = {
	allUsersBlog: [],
	error:''
};

export function reducer(state = initialState, action: UsersBlogActions): State {
  switch (action.type) {

  	case UsersBlogActionTypes.LoadUsersBlogs:
  	return {
  		...state
  	}
 
  	case UsersBlogActionTypes.LoadUsersBlogsSuccess:
  	return {
  		...state,
  		allUsersBlog: action.payload.data,
  		error: ''
  	}

  	case UsersBlogActionTypes.LoadUsersBlogsFailure:
  	return {
  		...state,
  		allUsersBlog: [],
  		error: action.payload.error
  	}

    default:
    return {
    	...state
    }
  }
}