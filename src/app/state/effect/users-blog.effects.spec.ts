import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UsersBlogEffects } from './users-blog.effects';

describe('UsersBlogEffects', () => {
  let actions$: Observable<any>;
  let effects: UsersBlogEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersBlogEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UsersBlogEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
