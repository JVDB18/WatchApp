import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(public auth: AuthService, private _router: Router){}
  isLog: boolean
  canActivate(): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
    this.auth.permission()
        if (this.auth.permission() !== true){
          this._router.navigate(['/'])
          console.log(this.auth.permission())
          return false
        }
        else {
          console.log(this.auth.permission())
          return true
        }
  }

}
