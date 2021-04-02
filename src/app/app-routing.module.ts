import { AddBlogComponent } from './add-blog/add-blog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'/addUser', pathMatch:'full' },
  { path:'addUser', component: SignUpComponent },
  { path:'login', component: LoginComponent },
  { path:'home', component: HomeComponent },
  { path:'addBlog', component: AddBlogComponent },
  { path: '**', redirectTo:'/addUser' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignUpComponent, LoginComponent, HomeComponent, 
                                  AddBlogComponent];
