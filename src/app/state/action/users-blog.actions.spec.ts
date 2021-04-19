import * as UsersBlogActions from './users-blog.actions';

describe('UsersBlog', () => {
  it('should create an instance', () => {
    expect(new UsersBlogActions.LoadUsersBlogs()).toBeTruthy();
  });
});
