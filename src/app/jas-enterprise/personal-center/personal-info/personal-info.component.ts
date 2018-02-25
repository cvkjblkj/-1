import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ValidatorService } from './../../../core/Validator/validator.service';

@Component({
  selector: 'personal-info',
  templateUrl: 'personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})

export class PersonalInfoComponent implements OnInit {

  public personalValue: boolean = true; // 列表的状态
  public isVisible: boolean = false; // 弹出框的状态
  public phoneIsVisible: boolean = false; // 电话弹出框
  public validateForm: FormGroup; // 编辑的弹出框内容规则
  public phonedateForm: FormGroup;
  public phoneForm: FormGroup; // 修改手机号的弹出框内容规则
  public radioValue = 'A'; // 单选框的状态
  public original: boolean = true; // 原手机号的页面状态
  public nowPhoneStatus: boolean = false; // 现在手机号的页面状态
  public phoneNumberPrefix = '86';
  public phoneNumber = '13333333333'; // 原手机号数据双向绑定的数据
  public nowPhoneNumber: string; // 现手机号数据双向绑定的数据
  public identifyStatus: boolean = true; // 原手机号获取验证码按钮的状态
  public nowIdentifyStatus: boolean = true; // 现手机号获取验证码按钮的状态
  public sendStatus: boolean = false; // 原手机号发送验证码的状态
  public nowSendStatus: boolean = false; // 现手机号发送验证码的状态
  public count = 10; // 倒计时辅值
  public time: any; // 全局定时器
  public disabled: boolean = false; // 原手机号页面获取密码按钮的状态
  public nowDisabled: boolean = false; // 现手机号页面获取密码按钮的状态
  public nextStatus: boolean = true; // 下一步按钮的状态
  public successStatus: boolean = true; //
  public nowIdentifying: any; // 现手机号的验证码数据
  public identifying: any; // 原手机号的验证码数据
  public nowIdentyStatus: boolean = true; // 现手机号的获取验证的状态
  public isActive: boolean = false; // 时间选择器的颜色
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: ['', [this.validatorService.userNameValidator]],
      email: ['', [this.validatorService.emailValidator]],
      wx: ['', [this.validatorService.wxValidator]],
      qq: ['', [this.validatorService.qqValidator]],

      _date: ['', [this.validatorService.dateValidator]],
      radioValue: [this.radioValue],
    });
    this.phonedateForm = this.fb.group({
      nowPhoneNumberPrefix: ['86'],
      nowPhoneNumber: ['', [this.phoneNumberValidator]],
    });
  };
  /**
   * 编辑按钮
   */
  public editClick() {
    this.isVisible = true;
  };

  /**
   * 确认按钮
   */
  public handleOk = (e, E) => {
    console.log(e);
    console.log(E);
    // setTimeout(() => {
    //   this.isVisible = false;

    // }, 3000);
  };
  public getFormControl(name) {
    return this.validateForm.controls[name];
  };
  public getPhoneControl(name) {
    return this.phonedateForm.controls[name];
  };
  /**
  *
  * @param电话校验
  */
  public phoneNumberValidator = (control: FormControl): { [s: string]: boolean } => {
    const phoneNumber_REGEXP = /^1(3|4|5|7|8)\d{9}$/;
    if (!control.value) {
      this.nowIdentyStatus = true; // 现手机号的获取验证的状态
      return { error: false, nowPhoneNumber: false };
    } else if (phoneNumber_REGEXP.test(control.value)) {
      this.nowIdentyStatus = false; // 现手机号的获取验证的状态
    } else if (!phoneNumber_REGEXP.test(control.value)) {
      return { error: true, nowPhoneNumber: true };
    }
  };

  /**
   * 修改手机号弹出框的状态
   */
  public phoneClick() {
    this.phoneIsVisible = true;
  }
  /**
   * 弹出框点击下一步的事件
   */
  public nextStep() {
    this.original = false; // 原手机号的页面的状态
    this.nowPhoneStatus = true;  // 现手机号的页面的状态
    this.count = 10; // 重新给全局变量辅值
    clearInterval(this.time); // 清楚定时器
    this.count = 10; // 重新辅值
    this.identifyStatus = true; // 原手机号点击获取验证码的按钮状态
    this.sendStatus = false; // 原手机号展示显示验证码的状态
  };
  /**
   *原手机号获取验证码的点击事件
   */

  public identifyClick() {
    this.sendStatus = true; // 远手机号获取验证码的状态
    this.identifyStatus = false; // 可重发的显示的状态
    this.disabled = true; // 按钮禁止状态
    this.timer();   // 调用全局定时器
    this.count = 10; // 重新给全局变量辅值
  };
  /**
   * 现手机号获取验证码的点击事件
   */
  public nowIdentifyClick() {
    this.nowIdentifyStatus = false; // 现手机号的获取验证码的按钮
    this.nowSendStatus = true; // 现手机号发送验证码的状态
    this.nowDisabled = true; // 现手机号页面获取密码按钮的状态
    this.timer();
    this.count = 10;
  };
  /**
   *保存
   */
  public sendOk() {
    this.isVisible = false;
    this.phoneIsVisible = false; // 修改手机号弹出框的状态
    // this.nowSendStatus = true; // 现手机号发送验证码的状态
    this.nowDisabled = false;  // 现手机号页面获取密码按钮的状态
    this.nowIdentifyStatus = true; // 现手机号的获取验证码的按钮
    this.nowSendStatus = false;
    clearInterval(this.time); // 清楚定时器
    this.count = 10; // 重新辅值
    this.original = true; // 原手机号的页面
    this.nowPhoneStatus = false; // 现手机号的页面
    this.nowIdentifying = ''; // 原手机号的验证码清空
    this.identifying = ''; // 现手机号的验证码清空
    this.nextStatus = true; // 下一步的按钮的状态
    this.successStatus = true;
  };
  /**
   * 设置全局定时器
   */
  public timer() {
    this.time = setInterval(() => {
      if (this.count <= 0) {
        this.disabled = false; // 原手机号的按钮的状态
        this.sendStatus = false; // 远手机号获取验证码的状态
        this.nowIdentifyStatus = true; // 可重发的显示的状态
        this.identifyStatus = true;  // 原手机号获取验证码按钮的状态
        this.nowSendStatus = false;// 现手机号发送验证码的状态
        return clearInterval(this.time); // 清除定时器
      } else {
        this.count--;
      }
    }, 1000);
  }
  /**
  * 弹出框取消事件
  */
  public handleCancel = ($event: MouseEvent) => {
    this.isVisible = false;
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    };

  };

  /**
   * 修改手机号的弹框取消事件
   */
  public sendCancel = ($event: MouseEvent) => {
    $event.preventDefault();
    this.phonedateForm.reset();
    for (const key in this.phonedateForm.controls) {
      this.phonedateForm.controls[key].markAsPristine();
    };
    this.phoneIsVisible = false; // 修改手机号的的弹窗状态
    this.original = true; // 原手机号修改页面的状态
    this.nowPhoneStatus = false; // 现手机号页面的修改状态
    this.sendStatus = false; // 远手机号获取验证码的状态
    this.identifyStatus = true; // 可重发的显示的状态
    this.nowIdentifyStatus = true; // 现手机号的获取验证码的状态
    this.nowSendStatus = false; // 现手机号的的验证码的的状态
    clearInterval(this.time); // 清楚定时器
    this.count = 10; // 重新辅值
    this.nextStatus = true;  // 下一步按钮的状态
    this.successStatus = true; // 保存按钮的状态
    this.nowIdentifying = ''; // 原手机号的验证码清空
    this.identifying = ''; // 现手机号的验证码清空
    this.nowIdentyStatus = true; // 现手机号的获取验证的状态

  };


  /**
   *原手机号验证码校验
   */
  public ngModelChange = (e) => {
    if (e === 'aa') {
      this.nextStatus = false;
    } else {
      this.nextStatus = true;
    }
  };
  /**
   * 现手机号的验证码校验
   */
  public nowChange = (e) => {
    if (e === 'ss') {
      this.successStatus = false;
    } else {
      this.successStatus = true;
    }
  };

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }
}
