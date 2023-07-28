import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Market } from 'src/app/market.interface';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css'],
  providers: [DecimalPipe],
})
export class MarketsComponent implements OnInit {
  marketsData: Market[] = []; 
  filteredMarketsData: Market[] = [];
  searchValue: string = '';
  i: number = 0;

  constructor(private http: HttpClient, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.fetchMarketsData();
  }

  fetchMarketsData(): void {
    
    this.http.get<any[]>('https://akademi-cp.bitlo.com/api/interview/markets').subscribe(
      (data) => {
        this.marketsData = data;
        this.filteredMarketsData = data;
      },
      (error) => {
        console.error('Error fetching markets data:', error);
      }
    );
  }


  filterMarkets(): void {
    if (!this.searchValue) {
      this.filteredMarketsData = this.marketsData;
    } else {
      const searchTerm = this.searchValue.toLowerCase();
      this.filteredMarketsData = this.marketsData.filter(market =>
        market.marketCode.toLowerCase().includes(searchTerm)
      );
    }
    this.i = this.calculatePositiveChangeRatio(this.filteredMarketsData);
  }

  customizeChangeRatio(changeRatio: number): any {
    const numericChangeRatio =changeRatio;
  
    if (numericChangeRatio < 0) {
      return { color: 'red' };
    } else if (numericChangeRatio > 0) {
      return { color: 'green' };
    } else {
      return {}; // Empty object for no specific style
    }
  }

  calculatePositiveChangeRatio(allMarkets: any[]): number {
    return allMarkets.filter(market => Number(market.change24hPercent) > 0).length; 

  }

  calculateMaxIncreaseMarket(allMarkets: any[]): any {
    if (allMarkets.length === 0) {
      return null;
    }
  
    return allMarkets.reduce((maxMarket, market) =>
      Number(market.change24hPercent) > Number(maxMarket.change24hPercent) ? market : maxMarket
    , allMarkets[0]); // Set the initial value as the first market in the array
  }
  
  calculateMaxDecreaseMarket(allMarkets: any[]): any {
    if (allMarkets.length === 0) {
      return null;
    }
  
    return allMarkets.reduce((minMarket, market) =>
      Number(market.change24hPercent) < Number(minMarket.change24hPercent) ? market : minMarket
    , allMarkets[0]); // Set the initial value as the first market in the array
  }
  
  calculateMarketAboveThreshold(allMarkets: any[], threshold: number): number {
    return allMarkets.filter(market => Number(market.currentQuote) > threshold).length;
  }
  
  calculateMarketBelowThreshold(allMarkets: any[], threshold: number): number {
    return allMarkets.filter(market => Number(market.currentQuote) < threshold).length;
  }
  
  calculateAverageQuote(allMarkets: any[]): number {
    const totalQuote = allMarkets.reduce((sum, market) => sum + Number(market.currentQuote), 0);
    return totalQuote / allMarkets.length;
  }

}


