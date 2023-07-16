import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedIn: boolean = false;
  authError: string = '';
  authToken:any;
 
  profileData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.authToken = localStorage.getItem('authToken');
    this.loggedIn = !!this.authToken;
    if( !this.loggedIn ){
      this.authError= 'Only logged in users can see this page!';
    }
    if(this.loggedIn){
      this.getProfileData();
      
    }
  }

  getProfileData() {
    
    const meEndpointURL = 'https://akademi-cp.bitlo.com/api/interview/auth/me';
    const meHttpOptions = {
      headers: new HttpHeaders({ 'x-bitlo-auth': this.authToken })
    };

    this.http.post<any>(meEndpointURL, {}, meHttpOptions).subscribe({
      next: meResponse => {
        console.log('Profile Data:', meResponse);
        this.profileData = meResponse.me;
      },
      error: error => {
        console.error('Failed to fetch profile data:', error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    });
  }




}
