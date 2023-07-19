import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Market } from 'src/app/market.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.css']
})
export class MarketDetailsComponent implements OnInit {
  marketsData: Market[] = [];
  marketCode: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.marketCode = this.route.snapshot.paramMap.get('marketCode') || '';
  this.fetchMarketsData();
  }

  fetchMarketsData(): void {
    this.http.get<any[]>('https://akademi-cp.bitlo.com/api/interview/markets').subscribe({
      next: data => {
        this.marketsData = data.filter(market => market.marketCode === this.marketCode);
        this.marketsData.forEach(market => {
          market.logoUrl = `https://static.bitlo.com/cryptologossvg/${this.getBaseAssetCode(market.marketCode)}.svg`;
        console.log(market.logoUrl);
        });
      },
      error: error => {
        console.error('Error fetching markets data:', error);
      }
    });
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
  customizeMarketCode(marketCode: string): string {
    const customMarketCode = marketCode.replace('-', '/');
    return customMarketCode;
  }

  getBaseAssetCode(marketCode: string): string {
    const [baseAssetCode] = marketCode.split('-');    
    return baseAssetCode.toLowerCase();
  }
}
