import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BalancesComponent } from './components/balances/balances.component';
import { DirectOrderComponent } from './components/direct-order/direct-order.component';
import { MarketsComponent } from './components/markets/markets.component';
import { MarketDetailsComponent } from './components/market-details/market-details.component';
import { AuthGuard } from './auth/auth.guard.service';

const routes: Routes = [  
  {path : '' , component: HomepageComponent},
  {path : 'login' , component: LoginComponent  },
  {path : 'logout' , component: LogoutComponent  },
  {path : 'profile' , component: ProfileComponent, canActivate: [AuthGuard] ,
    children:[
      {path: 'balances', component: BalancesComponent},
      {path: 'direct-orders', component: DirectOrderComponent}
    ]  },
  {path : 'markets' , component: MarketsComponent,},
  { path: 'market-details/:marketCode', component: MarketDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
