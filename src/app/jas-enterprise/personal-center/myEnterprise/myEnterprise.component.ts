import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EndterpriseService } from './../shared';
import { ValidatorService } from './../../../core/Validator/validator.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
@Component({
  selector: 'myEnterprise',
  templateUrl: 'myEnterprise.component.html',
  styleUrls: ['./myEnterprise.component.scss']
})

export class MyEnterpriseComponent implements OnInit {
  public tab = true; // tab切换
  public ownedState: any; // 所属企业
  public recordState: any; // 记录申请
  public isVisible: boolean = false; // 创建企业的弹出框
  public validateForm: FormGroup; // 创建弹出框的规则
  public appValidateForm: FormGroup; // 申请加入的弹出框的规则
  public enterpriseName: any; // 企业名称
  public newVisible: boolean = false; // 申请企业的状态
  public newIsVisible: boolean = false; // 创建企业，企业存在，加入企业弹窗的状态
  public newEnterpriseName: any; //企业名称
  public options: any = [
    { label: '沐沐', value: '1' },
    { label: '哈撒开', value: '2' }
  ];
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public endterpriseService: EndterpriseService,
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) { }
  ngOnInit() {
    this.validateForm = this.fb.group({
      enterpriseName: ['', this.enterpriseValidator],
      single: [''],
      telephoneNumber: ['', this.validatorService.telephoneNumberValidator],
      provinceName: [''],
      urbanDistrict: [''],
      countyName: [''],
      address: ['', this.validatorService.addressValidator]
    });
    this.appValidateForm = this.fb.group({
      newEnterpriseName: ['', this.validatorService.newEnterpriseValidator],
      applyValue: ['']
    });
    this.ownedState = this.router.url.indexOf('owned-enterprise');
    this.recordState = this.router.url.indexOf('record-info');
  };
  /**
   * 所属企业
   */
  public ownedInfo() {
    this.ownedState = 1;
    this.recordState = -1;
    const urls = this.router.url.slice(0, this.router.url.indexOf('myEnterprise-info')) + '/myEnterprise-info/owned-enterprise';
    this.router.navigate([urls]);
  };
  /**
   * 记录企业
   */
  public recordInfo() {
    this.ownedState = -1;
    this.recordState = 1;
    const urls = this.router.url.slice(0, this.router.url.indexOf('myEnterprise-info')) + '/myEnterprise-info/record-info';
    this.router.navigate([urls]);
  };
  /**
   * 创建企业
   */
  public create() {
    this.isVisible = true; // 创建企业的弹出框

    // this.endterpriseService.buttonStates = true;
  };

  /**
   * 申请企业
   */
  public application() {
    this.newVisible = true;

  };
  /**
   * 创建企业
   * @param name 
   */
  public getFormControl(name) {
    return this.validateForm.controls[name];
  };
  public newGetFormControl(name) {
    return this.appValidateForm.controls[name];
  }
  /**
  *创建弹出框取消事件
  */
  public handleCancel = ($event: MouseEvent) => {
    this.isVisible = false;
    this.endterpriseService.buttonStates = false;
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  };
  /**
   * 申请加入企业
   */
  public newCancel = (e) => {

    this.newVisible = false;
    this.endterpriseService.buttonStates = false;


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
  /**
   * 申请企业确认按钮 
   */
  public sendOk = (e, E) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    };

    this.endterpriseService.buttonStates = true;
    console.log(E);
    setTimeout(() => {
      this.endterpriseService.buttonStates = false;
    }, 100)

    // const urls = this.router.url.slice(0, this.router.url.indexOf('myEnterprise-info')) + '/myEnterprise-info/owned-enterprise';
    // this.router.navigate([urls]);
  };
  /**
    *企业名称校验 
    */
  public enterpriseValidator = (control: FormControl): any => {
    this.enterpriseName = control.value;
    const ENTERNAME_REGEXP = /^([A-Za-z0-9_\u4E00-\u9FA5]|-|\(|\)){4,40}$/i;
    if (!control.value) {
      return { required: true };
    } else if (control.value === 'aaaa') {
      return { error: true, config: true };
    } else if (!ENTERNAME_REGEXP.test(control.value)) {
      return { error: true, enterpriseName: true };
    }
  };
  /**
   *创建企业，企业存在时加入企业的点击事件 
   * @param e 
   */
  public spanClick(e) {
    console.log(e);
    this.isVisible = false;
    this.newIsVisible = true;
    this.enterpriseName = e.enterpriseName;
  };
  /**
   * 加入企业弹出框的取消
   * @param e 
   */
  public newhandleCancel(e) {
    this.newIsVisible = false;
  };
  /**
   * 加入企业的确认事件
   * @param e 
   */
  public newSendOk(e) {
    console.log(this.enterpriseName)
  };
}
