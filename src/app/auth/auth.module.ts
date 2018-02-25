import { CommonMethodService } from './../core/services/common-method.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule, ConfirmationService } from 'primeng/primeng';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RequestMethodService } from '../core/services/request-method.service';
import { HttpModule } from '@angular/http';

export const COMPONENT = [LoginComponent, RegisterComponent]
export const primengModule = [FileUploadModule]

@NgModule({
    declarations: COMPONENT,
    imports: [CommonModule, NgZorroAntdModule.forRoot(), HttpModule,
        BrowserAnimationsModule, primengModule, FormsModule, ReactiveFormsModule],
    exports: COMPONENT,
})

export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RootAuthModule,
            providers: [AuthGuard, AuthService, RequestMethodService, ConfirmationService, CommonMethodService],
        };
    }
}

@NgModule({
    imports: [
        AuthModule,
        RouterModule.forChild([{ path: 'login',  component: LoginComponent }]),
        // StoreModule.forFeature('auth', reducers),
        // EffectsModule.forFeature([AuthEffects]),
    ],
})
export class RootAuthModule { }
