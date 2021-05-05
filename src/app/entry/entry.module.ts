import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
  	EntryComponent,
  	LoginComponent,
  	SignUpComponent
  ],
  imports: [
    CommonModule,
    EntryRoutingModule,
    ReactiveFormsModule
  ]
})
export class EntryModule { }
