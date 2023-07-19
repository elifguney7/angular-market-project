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


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('tr-TR', options);
  }

  formatPhoneNumber(phoneNumber: string): string {
    const countryCode = phoneNumber.substring(0, 3);
    const areaCode = phoneNumber.substring(3, 6);
    const firstPart = phoneNumber.substring(6, 9);
    const secondPart = phoneNumber.substring(9, 11);
    const thirdPart = phoneNumber.substring(11, 13);
    
    return `${countryCode} ${areaCode} ${firstPart} ${secondPart} ${thirdPart}`;
  }

  formatUpdateDate(uDateString: string): string {
   const firstPart = uDateString.substring(0,10);
   const secondPart = uDateString.substring(10,27);
   return `${firstPart} ${secondPart} `;

    
  }


}
