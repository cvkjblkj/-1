
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
@Injectable()
export class ValidatorService {
  /**
*名字校验
*/
  userNameValidator = (control: FormControl): { [s: string]: boolean } => {
    const USER_REGEXP = /^([A-Za-z0-9\u4E00-\u9FA5]{1,20})$/i;
    if (!control.value) {
      return { required: true };
    } else if (!USER_REGEXP.test(control.value)) {
      return { error: true, userName: true };
    }
  };
  /**
* 邮箱验证
*/
  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i;
    if (!control.value) {

      return { error: false, email: false };

    } else if (!EMAIL_REGEXP.test(control.value)) {

      return { error: true, email: true };
    }
  };
  /**
  * 微信校验
  */
  wxValidator = (control: FormControl): { [s: string]: boolean } => {
    const WX_REGEXP = /^.{1,50}$/i;
    if (!control.value) {

      return { error: false, wx: false };

    } else if (!WX_REGEXP.test(control.value)) {

      return { error: true, wx: true };
    }
  };
  /**
 * qq号验证
 */
  qqValidator = (control: FormControl): { [s: string]: boolean } => {
    const QQ_REGEXP = /^\d{5,}$/i;
    if (!control.value) {
      return { error: false, qq: false };

    } else if (!QQ_REGEXP.test(control.value)) {
      return { error: true, qq: true };
    }
  };
  /**
  * 时间选择
  */
  dateValidator = (control: FormControl): any => {
    if (!control.value) {
      return { error: false, _date: false };
    }
  };
  /**
*
* @param电话校验
*/
  phoneNumberValidator = (control: FormControl): { [s: string]: boolean } => {
    const phoneNumber_REGEXP = /^1(3|4|5|7|8)\d{9}$/;
    if (!control.value) {
      return { error: false, phoneNumber: false };
    } else if (phoneNumber_REGEXP.test(control.value)) {
    } else if (!phoneNumber_REGEXP.test(control.value)) {
      return { error: true, phoneNumber: true };
    }
  };
  /**
 * 企业电话校验
 * 010-111111111
 */
  telephoneNumberValidator = (control: FormControl): { [s: string]: boolean } => {
    const telephoneNumber_REGEXP = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    if (!control.value) {
      return { error: false, telephoneNumber: false };
    } else if (!telephoneNumber_REGEXP.test(control.value)) {
      return { error: true, telephoneNumber: true };
    }

  };
  /**
  * 密码验证
  */
  passwordValidator = (control: FormControl): any => {

    const PASSWORD_REGEXP = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$/i;
    if (!control.value) {
      return { required: true };
    } else if (!PASSWORD_REGEXP.test(control.value)) {
      return { error: true, password: true };
    }
  };
  /**
   *企业名称校验 
   */
  enterpriseValidator = (control: FormControl): any => {

    const ENTERNAME_REGEXP = /^([A-Za-z0-9_\u4E00-\u9FA5]|-|\(|\)){4,40}$/i;
    if (!control.value) {
      return { required: true };
    } else if (!ENTERNAME_REGEXP.test(control.value)) {
      return { error: true, enterpriseName: true };
    }
  };
  /**
   * 企业地址校验
   */
  addressValidator = (control: FormControl): any => {
    const ADDRESS_REGEXP = /^([A-Za-z0-9_\u4E00-\u9FA5]|-){2,200}$/i;
    if (!control.value) {
      return { error: false, address: false };
    } else if (!ADDRESS_REGEXP.test(control.value)) {
      return { error: true, address: true };
    }
  };
  /**
  *申请加入企业名称校验 
  */
  newEnterpriseValidator = (control: FormControl): any => {

    const NEWENTERNAME_REGEXP = /^([A-Za-z0-9_\u4E00-\u9FA5]|-|\(|\)){4,40}$/i;
    if (!control.value) {
      return { required: true };
    } else if (!NEWENTERNAME_REGEXP.test(control.value)) {
      return { error: true, newEnterpriseName: true };
    }
  };

}
