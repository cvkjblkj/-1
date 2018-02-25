import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { LoginInfoComponent } from './login-info/login-info.component';
const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            { path: '', redirectTo: 'write-info', pathMatch: 'full' },
            {
                path: 'write-info',
                component: LoginInfoComponent,
            },

        ]
    }
]
export const HomePageRoutes = RouterModule.forChild(routes)