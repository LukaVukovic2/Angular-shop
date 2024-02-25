import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthResponseData, AuthService } from './auth.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent{
  submitted = false;
  loginSuccess = false;
  isLoginForm = true;
  error: string;
  isLoading = false;
  email: string;
  password: string;
  authObs: Observable<AuthResponseData>;
 
  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if(!form.valid){
      return;
    }
    this.email = form.value.email;
    this.password = form.value.password;
    this.submitted = true;
    if(this.isLoginForm){
      this.authObs = this.authService.loginUser(this.email, this.password);
    }else{
      this.authObs = this.authService.signUp(this.email, this.password);
    }

    this.authObs.subscribe(
      resData =>{
        this.isLoading = false;
        this.loginSuccess = true;
        this.router.navigate(['/products']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        this.loginSuccess = false;
      }
    );
    form.reset();
  }

  hidePassword(passLength: number){
    let hidden = '';
    for(let i = 0; i < passLength; i++){
      hidden += '*'; 
    }
    return hidden;
  }
  toggleMode(){
    this.isLoginForm = !this.isLoginForm;
  }
}
