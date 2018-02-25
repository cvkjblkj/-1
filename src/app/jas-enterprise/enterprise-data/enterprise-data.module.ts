import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpriseDataComponent } from './enterprise-data.component';
import { LogoInfoComponent } from './login-info/login-info.component';
import { EnterpriseRoutes } from './enterprise-data.routing';
import { FormsModule } from '@angular/forms';
import { CommonService } from './../../core/services/conmmon.service';
import { HandleInfoComponent } from './handle-info/handle-info.component';


@NgModule({
  imports: [
    CommonModule,
    EnterpriseRoutes,
    FormsModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [EnterpriseDataComponent, LogoInfoComponent, HandleInfoComponent,

],
  providers: [CommonService]
})
export class EnterpriseDataModule { }
