import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EnterpriseInfoComponent } from './../enterprise-info/enterprise-info.component';
import { ManageInfoComponent } from './../manage-info/manage-info.component';
@NgModule({
    imports: [
        FormsModule,
        CommonModule],

    exports: [EnterpriseInfoComponent, ManageInfoComponent],
    declarations: [EnterpriseInfoComponent, ManageInfoComponent]

})
export class DirectiveModule { }