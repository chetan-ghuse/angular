import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUsersBlog from 'app/state/reducer/users-blog.reducer';
import * as fromGetUser from 'app/state/reducer/get-user.reducer';


export interface State {

  [fromUsersBlog.usersBlogFeatureKey]: fromUsersBlog.State;
  [fromGetUser.getUserFeatureKey]: fromGetUser.State;
}

export const reducers: ActionReducerMap<State, any> = {

  [fromUsersBlog.usersBlogFeatureKey]: fromUsersBlog.reducer,
  [fromGetUser.getUserFeatureKey]: fromGetUser.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
