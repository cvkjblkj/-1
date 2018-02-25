import { CoreModule } from './core/core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthModule } from './auth/auth.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './core/containers/app.component';
import { AppRoutes } from './app.routing';

// 自定义组件
@NgModule({

  imports: [
    BrowserModule,
    AuthModule.forRoot(),
    CoreModule,
    AppRoutes,
  ],
  providers: [],
  declarations: [
    DashboardComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
