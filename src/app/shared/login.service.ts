import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: boolean = false;

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
