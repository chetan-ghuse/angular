import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from 'app/state/reducer/get-user.reducer';

const getCurrentUserFeatureState = createFeatureSelector<State>('getUser');

export const getCurrentUser = createSelector(
	getCurrentUserFeatureState,
	state => state.currUser
)

export const getError = createSelector(
	getCurrentUserFeatureState,
	state => state.error
)