
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user';
import{ loginUser } from './loginUser';
import { blogId } from './blogId';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  localhost: string = 'http://localhost:3000/';
  singUpUrl: string = `${this.localhost}addUser`;
  loginUrl: string = `${this.localhost}login`;
  blogUrl: string = `${this.localhost}userBlog`;
  addBlogurl: string = `${this.localhost}addBlog`;
  deleteBlogUrl: string = `${this.localhost}deleteBlog`;
  usersBlogUrl: string = `${this.localhost}usersBlog`;
  logoutUrl: string = `${this.localhost}logout`;


  constructor(
    private http: HttpClient) { }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.singUpUrl, newUser).pipe(
      catchError(this.handleError)
    );
  }

  loggedIn(req : any): Observable<loginUser> {
    return this.http.post<loginUser>(this.loginUrl,req).pipe(
      catchError(this.handleError)
    );
  }

  getBlog(): Observable<any> {
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authMsg });
      let options = { headers: headers };
      return this.http.post<any>(this.blogUrl,null,options).pipe(
        catchError(this.handleError)
      );
  }
  
  createBlog(details: any): Observable<any> {
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authMsg });
      let options = {headers: headers};
      return this.http.post<any>(this.addBlogurl,details,options).pipe(
        catchError(this.handleError)
      );
  }

  removeBlog(blogId:blogId): Observable<any> {
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authMsg
    });
    let obj: object;
    
    let options = {headers:headers,body: blogId};
    return this.http.delete<any>(this.deleteBlogUrl,options).pipe(
      catchError(this.handleError)
    );
                  
  }

  allUsersBlog(): Observable<any> {
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authMsg });
      let options = { headers: headers };
      return this.http.post<any>(this.usersBlogUrl,null,options).pipe(
        catchError(this.handleError)
      );
  }

  loggedOut(): Observable<any> {
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
      'Authorization': authMsg });
      let options = { headers: headers };
      console.log(authMsg);
      return this.http.post<any>(this.logoutUrl,null,options).pipe(
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
  
  loggedInUser() {
    return !!localStorage.getItem('authKey');
  }
    
}
