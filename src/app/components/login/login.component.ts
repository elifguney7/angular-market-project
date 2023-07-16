import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string= '';
  submitClicked: boolean=false; 
  loggedIn: boolean = false;
  authToken: string = '';
  loginError: string ='';

  constructor(private http: HttpClient,  private router: Router) {}

  ngOnInit() {
    // Check if the user has an active session to Redirect the user to the profile page
    const authToken = localStorage.getItem('authToken');
    if (authToken) {      
      this.router.navigate(['/profile']);
    }
  }

  submitForm(loginForm: any) {
     if (loginForm.valid) {
        
      const loginData = { identifier: this.username, password: this.password };
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      this.http.post<any>('https://akademi-cp.bitlo.com/api/interview/auth/login', loginData, httpOptions).subscribe({
        next: response => {
          
          console.log('Login successful!', response);
          this.loggedIn = true;
          this.authToken = response.token;

          localStorage.setItem('authToken', this.authToken);

          this.router.navigate(['/profile']);
          

          const meEndpointURL = 'https://akademi-cp.bitlo.com/api/interview/auth/me';
          const meHttpOptions = {
            headers: new HttpHeaders({ 'x-bitlo-auth': this.authToken })
          };

          this.http.post<any>(meEndpointURL, {}, meHttpOptions).subscribe({
            next: meResponse => {              
              console.log('Auth success:', meResponse);      
             
            }, 
            error:error => {
              // Handle /auth/me error
              console.error('Auth failed:', error);
              this.loggedIn = false;
              this.authToken = '';
            }
          });
      
        },
        error: error => {
          // Handle login error, e.g., show an error message
          console.error('Login failed:', error);
          this.loggedIn = false;
          this.authToken = '';
          this.loginError ='Wrong username or password '
        }
      });
     
    }
  }

}
