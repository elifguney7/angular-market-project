import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Balance } from 'src/app/balance.interface';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css'],
  providers: [DecimalPipe]
})
export class BalancesComponent implements OnInit {
  balancesData: Balance[] = []; // Use the Balance interface
  filteredBalances: Balance[] = [];
  authToken: any;
  showLowBalances = true; 
  
  constructor(private http: HttpClient, private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.authToken = localStorage.getItem('authToken');
    this.fetchBalances();
  }

  fetchBalances(): void {    
    const meHttpOptions = {
      headers: new HttpHeaders({ 'x-bitlo-auth': this.authToken })
    };
    
    this.http.post<any>('https://akademi-cp.bitlo.com/api/interview/auth/balances', {}, meHttpOptions).subscribe({  
      next: (data: any) => {
        console.log(data); // Log the API response to check its structure
        this.balancesData = data.balances; // Extract the balances array from the response
    this.filterBalances();

      },
      error: error => {
        console.error('Error fetching balances:', error);
      }
    });
  }

  filterBalances() {
    this.filteredBalances = this.balancesData.filter(balances =>
      this.showLowBalances ? Number(balances.availableAmountTRYValue) > 1 : true
    );
  }

 /* filterBalances(){
    if (checkbox.checked) {
    this.filteredBalances = this.balancesData.filter(balances =>
      (Number(balances.availableAmountTRYValue))>1
    );
  }
  else {
    this.filteredBalances= this.balancesData;
  }
  }*/


}
