import { CommonMethodService } from './../../core/services/common-method.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router,private commonMethodService:CommonMethodService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        console.log("1111111")
        return this.checkLogin(url);
        // return true
    }


    checkLogin(url: string): boolean {
        let data = this.commonMethodService.getCookie("userInfo");
        console.log("checkin-------------")
        console.log(data);
        if(data == "" || !data){
            this.router.navigate(['/login']);
            return false;
        } 
        if (this.authService.isLoggedIn) { return true; }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }

}