import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomepageComponent } from './components/homepage/homepage.component';

import { MarketsComponent } from './components/markets/markets.component';

const routes: Routes = [  
  {path : '' , component: HomepageComponent},
  {path : 'login' , component: LoginComponent  },
  {path : 'logout' , component: LogoutComponent  },
  {path : 'profile' , component: ProfileComponent  },
  {path : 'markets' , component: MarketsComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
