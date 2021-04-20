import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserPortalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UsersBlogComponent } from './users-blog/users-blog.component';
import { SortUserPipe } from './sort-user.pipe'; 
import { SubmitFormDirective } from './submit-form.directive';

@NgModule({
  declarations: [
  	UserPortalComponent,
  	AddBlogComponent,
  	HomeComponent,
  	MyProfileComponent,
  	NavBarComponent,
  	UsersBlogComponent,
    SortUserPipe,
    SubmitFormDirective
  ],
  imports: [
    CommonModule,
    UserPortalRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class UserPortalModule { }
