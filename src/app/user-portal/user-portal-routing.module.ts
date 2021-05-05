import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPortalComponent } from './user-portal.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UsersBlogComponent } from './users-blog/users-blog.component';
import { AuthGuard } from 'app/shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserPortalComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }, {
        path: 'addBlog',
        component: AddBlogComponent
      }, {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'profile',
        component: MyProfileComponent
      }, {
        path: 'usersBlog',
        component: UsersBlogComponent,
      }, {
        path: '**',
        redirectTo: '/home',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPortalRoutingModule { }
