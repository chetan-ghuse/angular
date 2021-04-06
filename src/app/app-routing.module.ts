
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersBlogComponent } from './users-blog/users-blog.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', redirectTo:'/addUser', pathMatch:'full' },
  { path:'addUser', component: SignUpComponent },
  { path:'login', component: LoginComponent },
  { 
    path:'home', component: HomeComponent,
    canActivate: [ AuthGuard ]
   },
  { 
    path:'addBlog', component: AddBlogComponent,
    canActivate: [ AuthGuard ]
  },
  { 
    path:'usersBlog', component: UsersBlogComponent,
    canActivate: [ AuthGuard ]
  },
  { path: '**', redirectTo:'/addUser' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignUpComponent, LoginComponent, HomeComponent, 
                                  AddBlogComponent, UsersBlogComponent];
