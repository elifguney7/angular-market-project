export interface Order {
    marketCode: string;
    orderSide: number;
    orderDate: Date;
    price: number;
    orderAmount: number;
    fillAmount: number;
  }
  