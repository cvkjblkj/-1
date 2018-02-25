import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
@Component({
  selector: 'password-info',
  templateUrl: 'password-info.component.html',
  styleUrls: ['./password-info.component.scss']
})

export class PasswordInfoComponent implements OnInit {
  editStatus = true; // 初始化页面的状态
  writeStatus = false; // 修改密码的状态
  validateForm: FormGroup; //
  constructor(private fb: FormBuilder) {
  };
  ngOnInit() {
    this.validateForm = this.fb.group({
      password: ['', [this.passwordValidator]],
      newpassword: ['', [this.newPasswordValidator]],
      passwordConfirmation: ['', [this.passwordConfirmationValidator]],
    });
  };
  /**
   * 修改点击按钮
   */
  edit() {
    this.editStatus = false; // 初始化页面的状态
    this.writeStatus = true; // 修改密码的状态
  };
  /**
   * 保存按钮
   */
  sure() {
    this.editStatus = true; // 初始化页面的状态
    this.writeStatus = false; // 修改密码的状态.
  };
  /**
   * 取消按钮
   */
  hide() {
    this.editStatus = true; // 初始化页面的状态
    this.writeStatus = false; // 修改密码的状态.
  };
  getFormControl(name) {
    return this.validateForm.controls[name];
  };
  /**
   *密码校验
   */
  passwordValidator = (control: FormControl): any => {
    if (!control.value) {
      return { required: true };
    }
  }
  /**
   * 新密码验证
   */
  newPasswordValidator = (control: FormControl): any => {

    const PASSWORD_REGEXP = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
    if (!control.value) {
      return { required: true };
    } else if (!PASSWORD_REGEXP.test(control.value)) {
      return { error: true, newpassword: true };
    }
  };
  /**
 * 密码再次确认
 */
  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls['passwordConfirmation'].updateValueAndValidity();
    });
  };
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['newpassword'].value) {
      return { confirm: true, error: true };
    }
  };

  /**
   * 提交保存
   */
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    };
    this.editStatus = true;
    this.writeStatus = false;
  };
 /**
  *
  * @param  取消
  */
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    this.editStatus = true;
    this.writeStatus = false;
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    };
  };
}
