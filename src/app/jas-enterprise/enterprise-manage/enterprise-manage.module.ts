import { CommonService } from './../../core/services/conmmon.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';                   // [(ngModel)]需要这个
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpriseManageComponent } from './enterprise-manage.component';
import { TreeModule } from 'angular-tree-component';            // 部门列表树形展示插件

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EnterpriseManageRoutes } from './enterprise-manage.routing';
import { UserAuditComponent } from './user-audit/user-audit.component';
import { SectionUserManageComponent } from './section-user-manage/section-user-manage.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,                   // 数据树形展示插件
    ReactiveFormsModule,          // Form 表单中属性 [formGroup] 需要这个模块
    EnterpriseManageRoutes,
    NgZorroAntdModule.forRoot()
  ],
  providers:[CommonService],
  declarations: [EnterpriseManageComponent, UserAuditComponent, SectionUserManageComponent]
  // declarations: [EnterpriseManageComponent]
  
})
export class EnterpriseManageModule { }
