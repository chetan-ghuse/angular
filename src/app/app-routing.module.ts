
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { 
    path: '',
    redirectTo:'/entry/login', 
    pathMatch:'full'
  }, {
    path: 'entry',
    loadChildren: () => import('./entry/entry.module').then(m => m.EntryModule)
  }, {
    path: 'user-portal',
    loadChildren: () => import('./user-portal/user-portal.module').then(m => m.UserPortalModule)
  }, { 
    path: '**', 
    redirectTo:'/entry/login', 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

