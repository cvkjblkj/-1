import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule, CalendarModule, TabViewModule, ToolbarModule, DialogModule, AccordionModule, GrowlModule, SharedModule, DataTableModule, AutoCompleteModule, SpinnerModule } from 'primeng/primeng';
import { PaginationModule, TabsModule } from 'ngx-bootstrap';
import { NgZorroAntdModule } from 'ng-zorro-antd';    // NG ZORRO



import {
  GridpaginationComponent,
  MenuItemComponent,
  HeadNavigationComponent,
  PhotoSwitchComponent,
  EchartsComponent
} from './components';

// 引入全局服务
import {
  GlobalSubscribeService,
} from './services';






const NGA_COMPONENTS = [
  GridpaginationComponent,
  MenuItemComponent,
  HeadNavigationComponent,
  PhotoSwitchComponent,
  EchartsComponent
];

const NGA_DIRECTIVES = [

];

const NGA_PIPES = [

];

const NGA_SERVICES = [
  GlobalSubscribeService
];

const NGA_VALIDATORS = [

];
const NGA_UICOMPONENTS = [
  ButtonModule,
  CalendarModule,
  TabViewModule,
  ToolbarModule,
  DialogModule,
  AccordionModule,
  SharedModule,
  DataTableModule,
  SpinnerModule,
  GrowlModule,
  PaginationModule.forRoot(),
  TabsModule.forRoot()
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    AutoCompleteModule,
    NgZorroAntdModule,
    ...NGA_UICOMPONENTS
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NgaModule,
      providers: [
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}
