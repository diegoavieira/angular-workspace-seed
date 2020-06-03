import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.configService.keycloak.authenticated) {
      if (route.data.roles && this.hasRoles(route.data.roles)) {
        this.router.navigate(['forbidden']);
        return false;
      }

      return true;
    }
  }

  private hasRoles(roles: Array<string>): boolean {
    const realmAccessRoles = this.configService.keycloak.tokenParsed.realm_access.roles;
    return roles.some((role) => (realmAccessRoles.indexOf(role) === -1 ? true : false));
  }
}
