import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ValidatorService } from './../../../core/Validator/validator.service';
@Component({
  selector: 'write-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss']
})
export class LoginInfoComponent implements OnInit {
  public newVisible: boolean = false; // 退出弹出框的状态
  public appValidateForm: FormGroup; // 申请加入的弹出框的规则
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) { }

  ngOnInit() {
    this.appValidateForm = this.fb.group({
      newEnterpriseName: ['', this.validatorService.newEnterpriseValidator],
      applyValue: ['']
    });
  }
  // var str='1366668888';手机号中间四位为星号
  // var str2 = str.substr(0,3)+"****"+str.substr(7);

  /**
   * 申请
   */
  public apply() {
    this.newVisible = true;
  };
  public newGetFormControl(name) {
    return this.appValidateForm.controls[name];
  }
  /**
  * 申请加入企业
  */
  public newCancel = (e) => {

    this.newVisible = false;
  };
  /**
 * 申请企业确认按钮 
 */
  public sendOk = (e, E) => {
    console.log(E);
  };
}
