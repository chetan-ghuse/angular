
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from 'app/shared/interfaces/user';
import{ loginUser } from 'app/shared/interfaces/loginUser';


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
  getUserUrl: string = `${this.localhost}profileDetails`;
  likeUrl: string = `${this.localhost}addRemoveLike`;
  updateUserUrl: string = `${this.localhost}updateUser`;
  updateBlogUrl: string = `${this.localhost}updateBlog`
  //authMsg: string = localStorage.getItem('authKey')!;


  constructor(
    private http: HttpClient) { }

  /*getHeader() {
    return (
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authMsg 
      })
     )
  }
*/
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
        'Authorization': authMsg 
      });
      let options = { headers: headers };
      return this.http.post<any>(this.blogUrl,null,options).pipe(
        catchError(this.handleError)
      );
  }
  
  createBlog(details: any): Observable<any> {
    //console.log(details);
    //let headers = this.getHeader();
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authMsg 
      });
    let options = {headers: headers};
    return this.http.post<any>(this.addBlogurl,details,options).pipe(
      catchError(this.handleError)
    );
  }

  removeBlog(blogId:number): Observable<any> {
    //const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    //let headers = this.getHeader();
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authMsg 
      });
    const obj = {"blogId": blogId};
    let options = {headers:headers,body: obj};
    return this.http.delete<any>(this.deleteBlogUrl,options).pipe(
      catchError(this.handleError)
    );
                  
  }

  allUsersBlog(): Observable<any> {
    //let headers = this.getHeader();
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authMsg 
    });
    let options = { headers: headers };
    return this.http.post<any>(this.usersBlogUrl,null,options).pipe(
      catchError(this.handleError)
    );
  }

  loggedOut(): Observable<any> {
    //let headers = this.getHeader();
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authMsg 
      });
    let options = { headers: headers };
    return this.http.post<any>(this.logoutUrl,null,options).pipe(
      catchError(this.handleError)
    );
  }

  getCurrUser(): Observable<any> {
    //let headers = this.getHeader();
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authMsg 
      });
    let options = { headers: headers };
    return this.http.get<any>(this.getUserUrl,options).pipe(
      catchError(this.handleError)
    );
  }

  addLikes(blogId: number): Observable<any> {
    //let headers = this.getHeader();
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authMsg 
      });
    let options = { headers: headers };
    const obj = {"blogId": blogId};
    return this.http.post<any>(this.likeUrl, obj,options).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(newInfo: any): Observable<any> {
    //let headers = this.getHeader();
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authMsg 
      });
    let options = { headers: headers };
    newInfo.password = localStorage.getItem('password');
    return this.http.put<any>(this.updateUserUrl,newInfo,options).pipe(
      catchError(this.handleError)
    );
  }

  updateBlog(details: any): Observable<any> {
    const authMsg = JSON.parse(localStorage.getItem('authKey')!);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authMsg 
    });
    let options = { headers: headers };
    return this.http.post<any>(this.updateBlogUrl, details, options).pipe(
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
    return throwError('Something bad happened; please try again later.');
  }
  
  loggedInUser() {
    return !!localStorage.getItem('authKey');
  }
  
  getUserDetail() {
    return !!localStorage.getItem('currentUser');
  } 
}
