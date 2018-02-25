import { RouterModule } from '@angular/router';
import { AppComponent } from './containers/app.component';
import { LoginComponent } from './../auth/components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from './../theme/nga.module';
export const COMPONENT = [AppComponent];

@NgModule({
    declarations: COMPONENT,
    imports: [CommonModule, RouterModule, NgaModule, ],
    exports: COMPONENT,
})
export class CoreModule {
    static forRoot() {
        return {
            NgModule: CoreModule,
            providers: [],
        };
    }
}
