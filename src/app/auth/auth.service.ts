import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Subject, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
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
  
  user = new BehaviorSubject<User>(null);
  admin = new BehaviorSubject<boolean>(null);
  dbAdmins: any;

  admins: any;
  private expDurationTimer: any;
  
  constructor(
    private http: HttpClient,
    private router: Router
    ){}
    
  signUp(email: string, password: string){
    return this.http
      .post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3v_skSKPuXsiDwYtMHltUXcON-JDyPb8',
      {
        email: email,
        password: password,
        returnSecureToken: true
    }).pipe(catchError(this.handleError), 
      tap(
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
    this.checkPermissionLevel(email).subscribe(
      resData => {
        this.dbAdmins = resData;
        const isAdmin = !!this.dbAdmins.find((admin: any) => admin.email === email.toLowerCase());
        this.admin.next(isAdmin);
        const user = new User(email, id, token, expirationDate, isAdmin);
        this.autoLogout(expiresIn * 1000);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      }
    );
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

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      isAdmin: boolean;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.isAdmin
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.admin.next(loadedUser.isAdmin);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  logoutUser(){
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if(this.expDurationTimer){
      clearTimeout(this.expDurationTimer);
    }
    this.expDurationTimer = null;
    this.admin.next(null);
  }

  autoLogout(expirationDuration: number){
    this.expDurationTimer = setTimeout(()=>{
      alert('Your session has expired. Please login again.');
      this.logoutUser();
    }, expirationDuration)
  }

  checkPermissionLevel(email: string){
    return this.http.
      get('https://angular-webshop-7ade4-default-rtdb.europe-west1.firebasedatabase.app/admins.json');
  }
}