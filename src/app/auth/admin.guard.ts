import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  // this adminguard was made to use when an admin is not supposed to access a certain page.

  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.admin.pipe(map(
        (admin: boolean) => {
          if (admin) {
            this.router.navigate(['cards'])
            return false
          } else {
            console.log("ik ben een admin: ", admin)
            return true;
          }
        }
      ))
  }
  
}
