import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OnAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: TokenStorageService,
    private alertService: AlertService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.accountService.getToken();
    if (!token) {
      return true;
    }
    this.alertService.onCallAlert('You Already Login', AlertType.Warning);
    this.router.navigate(['/']);
    return true;
  }
}
