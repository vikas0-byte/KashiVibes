import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    
    // Signal-based auth check
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Not logged in - redirect to home with query params
    return this.router.createUrlTree(['/'], {
      queryParams: {
        returnUrl: state.url,
        showLogin: 'true'
      }
    });
  }
}