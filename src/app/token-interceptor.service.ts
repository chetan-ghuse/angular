import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

const exclude = [
  'http://localhost:3000/',
  'http://localhost:3000/addUser',
  'http://localhost:3000/login'
];

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  private readonly notifier: NotifierService ;

  constructor(
    private router: Router,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (exclude.includes(req.url)) {
      return next.handle(req);
    }
    /*console.log(req.url);*/
    return next.handle(req).pipe(
      catchError(err => {
        if (err.error.msg === 'error in authorization') {
          this.logout();
        }
        return throwError(err);
      }),
    );
  }

  logout(): void {
    this.router.navigateByUrl('/entry/login');
  }
}
