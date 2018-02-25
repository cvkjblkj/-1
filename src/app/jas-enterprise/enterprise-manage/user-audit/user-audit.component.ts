import { RequestMethodService } from './../../../core/services/request-method.service';
import { CommonService } from './../../../core/services/conmmon.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { userAuditConfig } from './user-audit.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';    // NG-ZORRO Form表单需要的
@Component({
  selector: 'app-user-audit',
  templateUrl: './user-audit.component.html',
  styleUrls: ['./user-audit.component.scss']
})
export class UserAuditComponent implements OnInit {
  public userAuditConfigInfo = userAuditConfig; // 用户审核的配置信息
  public tabs = this.userAuditConfigInfo.tabs;  // tab页签名称
  public toBeAuditedList = this.userAuditConfigInfo.toBeAuditedList;    // 待审核
  public auditedList = this.userAuditConfigInfo.auditedList;    // 已审核
  public thList = [];  // grid的标题的数据
  // 弹窗
  public title = "用户审核"; // 弹窗名称
  public auditDialogBox = false;  // 弹窗显隐控制变量
  public auditForm: FormGroup;    // 用户审核表单数据
  public showUpperSection = false;   // 部门的下拉框显隐控制变量
  public selectedOption;  // 审核结果的双向数据绑定
  public departmentId; // 部门id
  public auditFormGroup: any = {
    modifyResult: [null, [Validators.required]],
    modifyPro: null,
    department: [null, [Validators.required]],
    job: null,
  };   // 初始化时弹窗表单状态
  public nodes = this.userAuditConfigInfo.nodes; // 部门树的假数据
  @ViewChild("auditRelselect") auditRelselect;   // 审核结果下拉框元素
  @ViewChild("modalContentUser") modalContentUser; // 弹窗
  data: any = [];  // grid假数据
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private rMService: RequestMethodService
  ) {
    // 审核弹窗表单数据
    this.auditForm = fb.group(this.auditFormGroup);
  }
  ngOnInit() {
    // 设置默认的 tab页面的grid列表头
    this.thList = this.toBeAuditedList;
    for (let i = 0; i < 86; i++) {
      this.data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        number: i + 1,
        colorName: "红色" + i + 10,
        oracle: "oracle----01928392981----" + i + 100,
      });
    }
  }

  /**
   * 初始化列表数据
   * 
   * @memberof UserAuditComponent
   * @author 宁
   */
  initDataGrid() {
    let url;
    let data;
    let __this = this;
    this.rMService.doGet(__this, url, data, (res) => {

    })
  }
  /**
   * 刷新数据
   */
  refresh(){

  }
  /**
   * tab页签切换
   * 
   * @param {any} e 选中的tab页签的信息
   * @memberof UserAuditComponent
   * @author 宁
   */
  public selectChangeTab(e) {
    if (e.index == 1) {
      // 已审核
      this.thList = this.auditedList;
    } else if (e.index == 0) {
      // 待审核
      this.thList = this.toBeAuditedList;
    };
  }


  /**
   * 弹窗 弹出显示
   * 用户审核弹窗显示
   * @memberof UserAuditComponent
   * @author 宁
   */
  public authed() {
    this.selectedOption = undefined;
    this.auditDialogBox = true;
    // 审核结果的选择结果切换
    this.auditRelselect.onChange = (newValue) => {
      this.selectedOption = newValue;
      if (newValue == "reject") {
        this.auditFormGroup.modifyPro = ['', [Validators.required]];
        this.auditFormGroup.department = ['', [Validators.required]];
      } else if (newValue == "pass") {
        this.auditForm.controls.department.clearValidators();
        this.auditForm.controls.department.updateValueAndValidity();
        this.auditFormGroup.department = ['', [Validators.required]];
        this.auditFormGroup.modifyPro = null;

      }
      this.auditForm = this.fb.group(this.auditFormGroup);
    }
  }

  /**
  * 选择部门树的某个节点
  * 
  * @param {any} e 
  * @memberof UserAuditComponent
  * @author 宁
  */
  treeSelectClick(e) {
    this.showUpperSection = false;
    this.departmentId = e.node.data.id;
    this.auditForm.value.department = e.node.data.name;
  }

  /**
   * 确定 保存
   * 
   * @memberof UserAuditComponent
   * @author 宁
   */
  public confirm() {
    console.log(this.auditForm.controls);
    for (const i in this.auditForm.controls) {
      this.auditForm.controls[i].markAsDirty();
    }
    let data = this.auditForm.value;
    data["departmentId"] = this.departmentId;
    delete data.department;
    console.log(data);
    console.log("11111")
  }


  /**
   * 用户审核弹窗 隐藏
   * 
   * @param {any} e 
   * @memberof UserAuditComponent
   * @author 宁
   */
  public cancelDialog(e) {
    this.auditDialogBox = false;
  }


  // _submitForm() {
  //   for (const i in this.auditForm.controls) {
  //     this.auditForm.controls[i].markAsDirty();
  //   }
  // }
}
