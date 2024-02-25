import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: "root"})

export class AdminGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
      return this.authService.admin.pipe(
        take(1),
        map(admin =>{
          const isAdmin = !!admin;
          if(isAdmin){
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        }
      )
    )
  } 
}