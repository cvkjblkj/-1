import { Routes, RouterModule } from '@angular/router';
import { EnterpriseManageComponent } from './enterprise-manage.component';
import { UserAuditComponent } from './user-audit/user-audit.component';
import { SectionUserManageComponent } from './section-user-manage/section-user-manage.component';

const routes: Routes = [
  {
    path: '',
    component: EnterpriseManageComponent,
    children: [
      {
        path: 'section-user-manage',
        component: SectionUserManageComponent,
      },
      {
        path: 'user-audit',
        component: UserAuditComponent
        // loadChildren: "./user-audit/user-audit.module#UserAuditModule"
        // loadChildren: () => System.import("./user-audit/user-audit.module.ts")
      }
    ]

  },
];

export const EnterpriseManageRoutes = RouterModule.forChild(routes);
