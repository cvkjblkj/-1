import { AuthGuard } from './auth/services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: './jas-enterprise/home-page/home-page.module#HomePageModule'
  },
  {
    path: 'advanced-rearch',
    loadChildren: './advanced-rearch/advanced-rearch.module#AdvancedRearchModule'
  },
  {
    path: 'enp-manage',
    loadChildren: './jas-enterprise/enterprise-manage/enterprise-manage.module#EnterpriseManageModule',
  },
  {
    path: 'enterprise-data',
    loadChildren: './jas-enterprise/enterprise-data/enterprise-data.module#EnterpriseDataModule'
  },
  {
    path: 'personal-center',
    loadChildren: './jas-enterprise/personal-center/personal-center.module#PersonalCenterModule'
  },
  {
    path: 'product-service',
    loadChildren: './jas-enterprise/product-service/product-service.module#ProductServiceModule'
  },

];
export const AppRoutes = RouterModule.forRoot(routes, { useHash: true });
