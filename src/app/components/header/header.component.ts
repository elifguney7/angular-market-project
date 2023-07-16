import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  private checkLoggedInInterval: any;
  
  constructor(private router: Router){}
  logout() {
    // Clear the login status and the token from the localStorage
    
    localStorage.removeItem('authToken');
    this.loggedIn = false;
    // Navigate to the login page after logging out
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
    // Check if the user is logged in by checking the localStorage
    let authToken = localStorage.getItem('authToken');
    this.loggedIn = !!authToken; // Set loggedIn to true if authToken exists, otherwise false

    this.checkLoggedInInterval = setInterval(() => {
      this.checkLoggedIn();
    }, 1);

  }

  ngOnDestroy() {
    // Don't forget to clear the interval when the component is destroyed to prevent memory leaks
    clearInterval(this.checkLoggedInInterval);
  }

  private checkLoggedIn() {
    const authToken = localStorage.getItem('authToken');
    const isLoggedIn = !!authToken; // Set isLoggedIn to true if authToken exists, otherwise false

    // Update loggedIn only if the value has changed to avoid unnecessary view updates
    if (this.loggedIn !== isLoggedIn) {
      this.loggedIn = isLoggedIn;
    }
  }



}
