import { EndterpriseService } from './shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalCenterComponent } from './personal-center.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalRoutes } from './personal-center.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInfoComponent } from './login-info/login-info.component';
import { PasswordInfoComponent } from './password-info/password-info.component';
import { CommonService } from './../../core/services/conmmon.service';
import { ValidatorService } from './../../core/Validator/validator.service';
import { MyApplicationComponent } from './my-application/my-application.component';

@NgModule({
  imports: [
    CommonModule,
    PersonalRoutes,
    NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PersonalCenterComponent, PersonalInfoComponent, LogInfoComponent, PasswordInfoComponent,
    MyApplicationComponent
],
  providers: [CommonService, ValidatorService, EndterpriseService]
})
export class PersonalCenterModule { }
