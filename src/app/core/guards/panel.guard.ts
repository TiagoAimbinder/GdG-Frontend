import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../services/UserService/user.service';


@Injectable()
export class PanelGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    // 1. Si no existe:
    let usu_id: any = Number(localStorage.getItem('usu_id') || 0);
    if (usu_id === 0){
      return of(true); 
    }

    return of(false);
  }
}