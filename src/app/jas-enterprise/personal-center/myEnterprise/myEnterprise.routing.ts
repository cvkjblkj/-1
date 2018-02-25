import { OwnedEnterpriseComponent } from './owned-enterprise/owned-enterprise.component';
import { Routes, RouterModule } from '@angular/router';
import { MyEnterpriseComponent } from './myEnterprise.component';
import { RecordInfoComponent } from './record-info/record-info.component';
const routes: Routes = [
  {
    path: '',
    component: MyEnterpriseComponent,
    children: [
      {
        path: 'owned-enterprise',
        component: OwnedEnterpriseComponent
      },
      {
        path: '',
        redirectTo: 'owned-enterprise',
        pathMatch: 'full'
      },
      {
        path: 'record-info',
        component: RecordInfoComponent
      },
    ]
  }
];
export const MyEnterpriseRoutes = RouterModule.forChild(routes);
