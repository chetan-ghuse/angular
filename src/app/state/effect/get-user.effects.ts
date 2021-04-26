import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';

import * as getUserActions from 'app/state/action/get-user.actions';
import { ApiServiceService } from 'app/api-service.service';

@Injectable()
export class GetUserEffects {

  constructor(private actions$: Actions,
  						private apiService: ApiServiceService
  						) {}

  @Effect()
  loadGetUser$: Observable<Action> = this.actions$.pipe(
  	ofType(getUserActions.GetUserActionTypes.LoadGetUsers),
  	mergeMap(
  		action => this.apiService.getCurrUser().pipe(
  			map(currUser => (new getUserActions.LoadGetUsersSuccess({ data: currUser }))),
  			catchError(err => of(new getUserActions.LoadGetUsersFailure({ error: err })))
  		)
  	)
  );

}
