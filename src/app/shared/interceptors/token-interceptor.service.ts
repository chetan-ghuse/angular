import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const exclude = [
  'http://localhost:3000/',
  'http://localhost:3000/addUser',
  'http://localhost:3000/login'
];

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (exclude.includes(req.url)) {
      return next.handle(req);
    }
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
