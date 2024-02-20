import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Subject, throwError, tap } from 'rxjs';
import { User } from "./user.model";

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService{

  user = new Subject<User>();

  constructor(private http: HttpClient){}

  signUp(email: string, password: string){
    return this.http
      .post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3v_skSKPuXsiDwYtMHltUXcON-JDyPb8',
      {
        email: email,
        password: password,
        returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(
      resData =>{
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
    ));
  }
  loginUser(email: string, password: string){
    return this.http
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3v_skSKPuXsiDwYtMHltUXcON-JDyPb8',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(
        resData =>{
          this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }
      ))
  }

  private handleAuth(email: string, id: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = "Unknown error occured!";
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Email or password is invalid!';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
      }
      return throwError(errorMessage);
  }
}