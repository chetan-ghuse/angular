import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUsersBlog from '../users-blog.reducer';


export interface State {

  [fromUsersBlog.usersBlogFeatureKey]: fromUsersBlog.State;
}

export const reducers: ActionReducerMap<State, any> = {

  [fromUsersBlog.usersBlogFeatureKey]: fromUsersBlog.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
