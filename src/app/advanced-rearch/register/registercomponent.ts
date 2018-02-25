import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({

  selector: 'register',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [this.emailValidator]],
      password: ['', [this.passwordValidator]],
      passwordConfirmation: ['', [this.passwordConfirmationValidator]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [this.phoneNumberValidator]],
      telephoneNumber: [null, [this.telephoneNumberValidator]]
    });
  };

  /**
   * 邮箱验证
   */
  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i;
    if (!control.value) {
      return { required: true };
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  };
  /**
   * 密码验证
   */
  passwordValidator = (control: FormControl): any => {

    const PASSWORD_REGEXP = /^[\w]{6,12}$/;
    if (!control.value) {
      return { required: true };
    } else if (!PASSWORD_REGEXP.test(control.value)) {
      return { error: true, password: true };
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
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
  };
  /**
   *
   * @param电话校验
   */
  phoneNumberValidator = (control: FormControl): { [s: string]: boolean } => {
    const phoneNumber_REGEXP = /^1(3|4|5|7|8)\d{9}$/;
    if (!control.value) {
      return { required: true };
    } else if (!phoneNumber_REGEXP.test(control.value)) {
      return { error: true, phoneNumber: true };
    }

  }
  /**
   * 企业电话校验
   * 010-111111111
   */
  telephoneNumberValidator = (control: FormControl): { [s: string]: boolean } => {
    const telephoneNumber_REGEXP = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    if (!control.value) {
      return { required: true };
    } else if (!telephoneNumber_REGEXP.test(control.value)) {
      return { error: true, telephoneNumber: true };
    }

  }
  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
