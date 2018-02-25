
import { NgaModule } from './../theme/nga.module';
import { NgModule } from '@angular/core';
import { AdvancedRearchComponent } from './advanced-rearch.component';
import { CommonModule } from '@angular/common';
import { advancedResearchRoutes } from './advanced-rearch.routing';
import { RegisterComponent } from './register/registercomponent';
import { TableListComponent } from './table-list/table-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StepComponent } from './step/step.component';
import { DynamicComponent } from './dynamic/dynamic.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    advancedResearchRoutes,
    NgZorroAntdModule.forRoot(),
    NgaModule,
    ReactiveFormsModule,
  ],



  declarations: [AdvancedRearchComponent, RegisterComponent, StepComponent,
    TableListComponent,
    DynamicComponent
],

  providers: []
})
export class AdvancedRearchModule { }
