import { CommonMethodService } from './../../../core/services/common-method.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RequestMethodService } from '../../../core/services/request-method.service';
import { INCONFIG } from '../../../core/global';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorPrompt: boolean = false; // 错误提示
  validateForm: FormGroup;



  constructor(private fb: FormBuilder, private requestMethodService: RequestMethodService, private commonMethodService: CommonMethodService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
  _submitForm() {
    let data = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      data[i] = this.validateForm.controls[i].value;
    }
    let __this = this;
    let url = INCONFIG.frameworkServerSrc+"login/loginByPassword";
    // this.commonMethodService.setCookie("userInfo", JSON.stringify(data), 3 * 60 * 1000);
    this.requestMethodService.doPost(__this, url, data, (res) => {
      console.log();

    })

  }

}
