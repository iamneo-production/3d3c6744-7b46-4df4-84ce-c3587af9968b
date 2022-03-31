import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './user/components/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   isPresent:boolean = false;

  constructor(private loginService:LoginService ,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
      const url: string = state.url;

      return this.checkLogin(url);
  }
 
  
  checkLogin(url: string): true|UrlTree {
    if(this.loginService.isLoggedInToken){
    return true;}
    return this.router.parseUrl('/user/login');
  
  }
  

}
