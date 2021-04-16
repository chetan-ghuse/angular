import { createFeatureSelector, createSelector } from '@ngrx/store';

import{ State } from './users-blog.reducer';

const getAllUsersBlogFeatureState = createFeatureSelector<State>('usersBlogState');

export const getUsersBlog = createSelector(
	getAllUsersBlogFeatureState,
	state => state.allUsersBlog
)

export const getError = createSelector(
	getAllUsersBlogFeatureState,
	state => state.error
)
