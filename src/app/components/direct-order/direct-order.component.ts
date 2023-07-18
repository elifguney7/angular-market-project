import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from 'src/app/order.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-direct-order',
  templateUrl: './direct-order.component.html',
  styleUrls: ['./direct-order.component.css'],
  providers: [DecimalPipe]
})
export class DirectOrderComponent implements OnInit {

  orderData: Order[] = [];
  authToken: any;
  fillPercent: number =0;

constructor(private http: HttpClient, private decimalPipe: DecimalPipe){}

ngOnInit(): void {
  this.authToken = localStorage.getItem('authToken');
  this.fetchOrders();
}

fetchOrders(){
  const meHttpOptions = {
    headers: new HttpHeaders({ 'x-bitlo-auth': this.authToken })
  };

  this.http.post<any>('https://akademi-cp.bitlo.com/api/interview/auth/open-orders', {}, meHttpOptions).subscribe({
    next: data => {
      console.log(data);
      this.orderData = data.openOrders;
    },
    error: error => {
      console.error('Error fetching open orders:', error);
    }
    
  });
}
calculateFillPercent(fillAmount: number,orderAmount: number ): number{
 return fillAmount/orderAmount *100;

}

}
