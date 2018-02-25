import { StatisticsInfoComponent } from './statistics-info.component';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseInfoComponent } from './enterprise-info/enterprise-info.component';
import { ApplicationInfoComponent } from './application-info/application-info.component';
const routes: Routes = [
  {
    path: '',
    component: StatisticsInfoComponent,
    children: [
      {
        path: 'enterprise-info',
        component: EnterpriseInfoComponent
      },
      {
        path: '',
        redirectTo: 'enterprise-info',
        pathMatch: 'full'
      },
      {
        path: 'application-info',
        component: ApplicationInfoComponent
      }
    ]
  }
]
export const StatisticsRoutes = RouterModule.forChild(routes);
