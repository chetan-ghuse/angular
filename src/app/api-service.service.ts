
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user';
import{ loginUser } from './loginUser';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  singUpUrl: string = "http://localhost:3000/addUser";
  loginUrl: string = "http://localhost:3000/login";
  currUser!: string;
  constructor(
    private http: HttpClient) { }

    addUser(newUser: any): Observable<User> {
      console.log(newUser["currentUser"]);
      this.currUser = newUser["currentUser"]["firstName"];
      return this.http.post<User>(this.singUpUrl, newUser["currentUser"])
        .pipe(
          catchError(this.handleError)
        );
    }

    loggedIn(req : any): Observable<loginUser> {
      
      return this.http.post<loginUser>(this.loginUrl,req["currentUser"])
                      .pipe(
                        catchError(this.handleError)
                      );
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        
        console.error('An error occurred:', error.error.message);
      } else {
        
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      
      return throwError(
        'Something bad happened; please try again later.');
    }

    
}
