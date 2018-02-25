import { CommonService } from './../../../core/services/conmmon.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuditComponent } from './user-audit.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [UserAuditComponent],
  providers:[CommonService]
})
export default class UserAuditModule { }