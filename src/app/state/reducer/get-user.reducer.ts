import { Action } from '@ngrx/store';

import { CurrentUser } from 'app/CurrentUser';
import { GetUserActions, GetUserActionTypes } from 'app/state/action/get-user.actions';

export const getUserFeatureKey = 'getUser';

export interface State {
	currUser: CurrentUser,
	error: string
}

export const initialState: State = {
	currUser: {
		error: true,
		msg: '',
		response: {
			id: -1,
			firstName: '',
			lastName: '',
			emailId: '',
			createdAt: ''
		}
	},
	error: ''
};

export function reducer(state = initialState, action: GetUserActions): State {
  switch (action.type) {

  	case GetUserActionTypes.LoadGetUsers:
  	return{
  		...state
  	}

  	case GetUserActionTypes.LoadGetUsersSuccess:
  	return {
  		...state,
  		currUser: action.payload.data,
  		error: ''
  	}

  	case GetUserActionTypes.LoadGetUsersFailure:
  	return {
  		...state,
  		currUser:  {
				error: true,
				msg: '',
				response: {
					id: -1,
					firstName: '',
					lastName: '',
					emailId: '',
					createdAt: ''
				}
			},
			error: action.payload.error
  	}

    default:
      return state;
  }
}
