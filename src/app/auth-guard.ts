import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard {

    constructor(private router : Router ) {
    }

    canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
        const user =  localStorage.getItem('user');
        if(user) return true;
        else{
            this.router.navigate(['/admin']);
            return false;
        }
    }
}