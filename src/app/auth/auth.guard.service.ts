import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authToken = localStorage.getItem('authToken');
    const isLoggedIn = !!authToken;

    if (isLoggedIn) {
      return true;
    } else {
      alert('Only logged in users can see this page!');
      this.router.navigate(['/login']); // Replace 'login' with your login page path
      return false;
    }
  }
}
