import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  
  submitted = false;
  loginSuccess: boolean = false;
  isLoginForm = true;
  error: string;
  isLoading = false;
  email: string;
  password: string;
 
  constructor(
    private authService: AuthService
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

    }else{
      this.authService.signUp(this.email, this.password).subscribe(
        resData =>{
          console.log(resData);
          this.isLoading = false;
          this.loginSuccess = true;
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }
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
