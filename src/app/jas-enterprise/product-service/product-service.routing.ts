import { Routes, RouterModule } from '@angular/router';
import { ProductServiceComponent } from './product-service.component';
import { PatrolGuardComponent } from './patrol-guard/patrol-guard.component';
import { ProtectionManageComponent } from './protection-manage/protection-manage.component';
const routes: Routes = [
    {
        path: '',
        component: ProductServiceComponent,
        children: [
            { path: '', redirectTo: 'patrol-guard', pathMatch: 'full' },
            {
                path: 'patrol-guard',
                component: PatrolGuardComponent,
            },
            {
                path: 'protection-manage',
                component: ProtectionManageComponent
            }

        ]
    }
]
export const ProductServiceRoutes = RouterModule.forChild(routes)