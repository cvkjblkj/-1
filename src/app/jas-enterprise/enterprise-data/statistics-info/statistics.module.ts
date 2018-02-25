import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsInfoComponent } from './statistics-info.component';
import { EnterpriseInfoComponent } from './enterprise-info/enterprise-info.component';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { StatisticsRoutes } from './statistics-info.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonService } from './../../../core/services/conmmon.service';
import { FormsModule } from '@angular/forms';
import { NgaModule } from './../../../theme/nga.module';
@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutes,
    FormsModule,
    NgaModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [StatisticsInfoComponent, EnterpriseInfoComponent, ApplicationInfoComponent],
  providers: []
})
export class EnterpriseDataModule { }
