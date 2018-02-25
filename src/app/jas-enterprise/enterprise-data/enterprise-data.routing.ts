import { Routes, RouterModule } from '@angular/router';
import { EnterpriseDataComponent } from './enterprise-data.component';
import { LogoInfoComponent } from './login-info/login-info.component';
import { HandleInfoComponent } from './handle-info/handle-info.component';
const routes: Routes = [
  {
    path: '',
    component: EnterpriseDataComponent,
    children: [
      {
        path: 'write-info',
        component: LogoInfoComponent
      }
      ,
      {
        path: '',
        redirectTo: 'statistics-info',
        pathMatch: 'full'
      },
      {
        path: 'handle-info',
        component: HandleInfoComponent
      },
      {
        path: 'statistics-info',
        loadChildren: './statistics-info/statistics.module#EnterpriseDataModule'
      }

    ]
  }
];
export const EnterpriseRoutes = RouterModule.forChild(routes);

