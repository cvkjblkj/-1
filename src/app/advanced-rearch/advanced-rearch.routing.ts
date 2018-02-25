import { Routes, RouterModule } from '@angular/router';
import { AdvancedRearchComponent } from './advanced-rearch.component';
import { RegisterComponent } from './register/registercomponent';
import { StepComponent } from './step/step.component';
import { TableListComponent } from './table-list/table-list.component';
import { DynamicComponent } from './dynamic/dynamic.component';
const routes: Routes = [

  {
    path: '',
    component: AdvancedRearchComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,

      },
      {
        path: 'step',
        component: StepComponent,

      }, {
        path: "table-list",
        component: TableListComponent

      }, {
        path: "dynamic",
        component: DynamicComponent

      }
    ]
  },
];


export const advancedResearchRoutes = RouterModule.forChild(routes);
