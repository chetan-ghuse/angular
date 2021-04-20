
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiServiceService } from './api-service.service';
import { AuthGuard } from './auth.guard';
import { reducers, metaReducers } from './reducers';
import { UsersBlogEffects } from 'app/state/effect/users-blog.effects';
import { GetUserEffects } from 'app/state/effect/get-user.effects';
import { TokenInterceptorService } from './token-interceptor.service';





const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12,
    },
    
    vertical: {
      position: 'top',
      distance: 50,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 2000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};


@NgModule({
  declarations: [
    AppComponent,
    /*SortUserPipe*/
    /*...routingComponents,
    NavBarComponent,*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgbModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UsersBlogEffects, GetUserEffects])
    
  ],
  providers: [ 
    ApiServiceService, 
    AuthGuard, 
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
