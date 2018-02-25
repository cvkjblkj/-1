import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MyEnterpriseRoutes } from './myEnterprise.routing';
import { MyEnterpriseComponent } from './myEnterprise.component';
import { OwnedEnterpriseComponent } from './owned-enterprise/owned-enterprise.component';
import { RecordInfoComponent } from './record-info/record-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from './../../../core/Validator/validator.service';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot(),
    MyEnterpriseRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MyEnterpriseComponent, OwnedEnterpriseComponent, RecordInfoComponent],
  providers: [ValidatorService]
})
export class MyEnterpriseModule { }
