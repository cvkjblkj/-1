import { Routes, RouterModule } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalCenterComponent } from './personal-center.component';
import { LogInfoComponent } from './login-info/login-info.component';
import { PasswordInfoComponent } from './password-info/password-info.component';
import { MyApplicationComponent } from './my-application/my-application.component';
const routes: Routes = [
  {
    path: '',
    component: PersonalCenterComponent,
    children: [
      {
        path: 'personal-info',
        component: PersonalInfoComponent
      },
      {
        path: '',
        redirectTo: 'personal-info',
        pathMatch: 'full'
      },
      {
        path: 'entry-info',
        component: LogInfoComponent
      },
      {
        path: 'password-info',
        component: PasswordInfoComponent
      },
      {
        path: 'myEnterprise-info',
        loadChildren: './myEnterprise/myEnterprise.module#MyEnterpriseModule'
      },
      {
        path: 'my-application',
        component: MyApplicationComponent
      }
    ]
  }
];
export const PersonalRoutes = RouterModule.forChild(routes);
