import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { CommonService } from './../../core/services/conmmon.service';
import { HomePageRoutes } from './home-page.routing';
import { LoginInfoComponent } from './login-info/login-info.component';
import { DirectiveModule } from './shared/directive.module';
import { RecommendInfoComponent } from './recommend-info/recommend-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from './../../core/Validator/validator.service';
@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule.forRoot(),
        HomePageRoutes,
        FormsModule,
        ReactiveFormsModule,
        DirectiveModule
    ],
    declarations: [
        LoginInfoComponent, HomePageComponent, RecommendInfoComponent
    ],
    providers: [CommonService, ValidatorService]
})
export class HomePageModule { }