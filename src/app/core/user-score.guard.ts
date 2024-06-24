import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { GithubService } from '../views/pages/main/services/github.service';
import { SharedService } from '../../../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserScoreGuard implements CanActivate {

  constructor(private githubService: GithubService, private router: Router, private sharedService: SharedService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const username = route.paramMap.get('username');
    return this.githubService.getUserDetails(username!).pipe(
      map(user => {
        if (user.followers >= 30.0) {
          return true;
        } else {
          this.sharedService.error("No se pueden consultar perfiles con menos de 30 seguidores", true);
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
