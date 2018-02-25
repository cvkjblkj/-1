import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from './../../core/services/conmmon.service';
import { ProductServiceComponent } from './product-service.component';
import { ProductServiceRoutes } from './product-service.routing';
import { PatrolGuardComponent } from './patrol-guard/patrol-guard.component';
import { ProtectionManageComponent } from './protection-manage/protection-manage.component';
import { AutoCompleteModule } from 'primeng/primeng';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule.forRoot(),
        ProductServiceRoutes,
        AutoCompleteModule
    ],
    declarations: [ProductServiceComponent, PatrolGuardComponent, ProtectionManageComponent
    ],
    providers: [CommonService]
})
export class ProductServiceModule { }
