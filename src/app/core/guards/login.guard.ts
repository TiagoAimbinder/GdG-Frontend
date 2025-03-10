import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/UserService/user.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class 

LoginGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    // 1. Si no existe la sesión (usu_id = 0) - No dejo entrar:
    let usu_id: any = Number(localStorage.getItem('usu_id') || 0);
    if (usu_id === 0){
      localStorage.clear()
      this.router.navigate(['/login'])
      return of(false); 
    }

    const usu_token = localStorage.getItem('usu_token');
    console.log(usu_token)

    // 2. Si existe la sesión, verifico la validez del token: 
    return (this.userService.validateToken(usu_id, usu_token)).pipe(
      map( (res:any) => {
        if (res.valid) {
          return true;
        };
        localStorage.clear();
        this.router.navigate(['/login'])
        return false;
      }),
      catchError( (err) => {
        localStorage.clear();
        this.router.navigate(['/login'])
        return of(false);
      })
    )

  }
}