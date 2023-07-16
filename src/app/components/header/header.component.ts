import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  
  constructor(private router: Router){}

  ngOnInit() {
    // Check if the user is logged in by checking the localStorage
    const authToken = localStorage.getItem('authToken');
    this.loggedIn = !!authToken; // Set loggedIn to true if authToken exists, otherwise false
  }

  logout() {
    // Clear the login status and the token from the localStorage
    this.loggedIn = false;
    localStorage.removeItem('authToken');
    // Navigate to the login page after logging out
    this.router.navigate(['/login']);
  }
}
