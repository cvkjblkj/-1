import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../core/services/conmmon.service';   // 阻止点击冒泡事件方法
// https://ng.ant.design/version/0.5.x/#/components/notification
import { NzNotificationService } from 'ng-zorro-antd';
// https://ng.ant.design/version/0.5.x/#/components/modal
import { NzModalService } from 'ng-zorro-antd';
// 临时数据, 用户数据，以后对接API后就可以删除这个文件了
import {userData} from './data';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';    // NG-ZORRO Form表单需要的


@Component({
  providers: [CommonService],
  selector: 'app-section-user-manage',
  templateUrl: './section-user-manage.component.html',
  styleUrls: ['./section-user-manage.component.scss']
})
export class SectionUserManageComponent implements OnInit {

  public addSectionForm: FormGroup;           // NG-ZORRO插件需要的组件 添加部门表单数据
  public searchSection: any = '';             // 搜索部门输入框的内容
  public sectionSelectedNode: any = null;     // 部门列表选中的节点数据
  public addDialogBox = false;                // 添加部门弹窗显示、隐藏控制
  public showUpperSection = false;            // 是否显示上级部门下拉列表
  public refreshSectionList= false;           // 刷新部门列表标志
  public dialogBoxParam: any;                 // 弹窗需要的参数： 添加弹窗、编辑弹窗一样，用一个弹窗，
  public sectionId: any;                      // 部门ID， 用于弹窗中隐藏的ID设置

  // 用户列表变量
  public showDepartmentDIV = false;           // 部门列表排序 保存于取消显示标志
  public userStatusList: any[];               // 用户状态列表数据
  public userStatus: any;                     // 用户状态， 选择的数据
  public oldUserStatus: any;                  // 旧的用户状态， 用于确定更改了状态
  public checkedBox = false;                  // 部门及一下多选框是否选中
  public userData = userData.root1;           // 用户数据
  public addUserDialogBox = false;            // 添加用户弹窗显示、隐藏控制
  public addUserForm: FormGroup;              // 添加用户表单数据
  public showUserModal: any;                  // 显示用户信息弹窗模块
  public userInfo: any;                       // 一个用户的基本信息
  options = { displayField: 'name', idField: 'uuid', allowDrag: false };
  nodes: any = [
    {
      id: 1,
      name: 'root1',
      isExpanded: true,     // 是否展开子节点， true： 展开子节点
      children: [
        { id: 2, name: 'child1', children: [], isExpanded: true, },
        { id: 3, name: 'child2', children: [], isExpanded: true, },
        {
          id: 4,
          name: 'root2',
          isExpanded: true,
          children: [
            { id: 5, name: 'child2.1', children: [], isExpanded: true, },
            {
              id: 6,
              name: 'card',
              isExpanded: true,
              children: [
                { id: 7, name: 'TV', children: [], isExpanded: true, }
              ]
            }
          ]
        }
      ]
    },
  ];

  constructor(
    private fb: FormBuilder,                      // NG-ZORRO 需要的Form数据格式
    public commonService: CommonService,          // 阻止冒泡事件方法
    private notification: NzNotificationService,  // 通知提醒框
    private confirmServ: NzModalService,          // 确认对话框
  ) { }

  @ViewChild('sectionManage') sectionManage;      // 部门列表部分
  @ViewChild('userManage')    userManage;         // 用户列表部分
  @ViewChild('sectionTreeOne') sectionTreeOne;    // 部门列表 因为tree结构数据初始化后不会改变，所以使用2个来手动刷新
  @ViewChild('sectionTreeTwo') sectionTreeTwo;    // 部门列表
  ngOnInit() {
    // 头部60 + 14 + 14 window.innerHeight: 网页中 body元素的高度
    this.userManage.nativeElement.style.minHeight = window.innerHeight - 88 + 'px';

    this.sectionSelectedNode = {
      data: {
        id: 1,
        name: 'root1', },
      parent: { parent: null },
    };

    // 添加部门弹窗表单需要的数据格式
    this.addSectionForm = this.fb.group({
      name        : [null, [ this.SectionNameValidator ]],
      upperSection: [null, [Validators.required]],
      id          : null,
      verify      : false,
    });
    // 添加用户弹窗表单数据
    this.addUserForm = this.fb.group({
      name      : [null, [this.SectionNameValidator]],
      mobileNum : [null, [this.phoneNumberValidator]],
      sex       : null,
      department: [null, [Validators.required]],
      job       : null,
      email     : null,
      verify    : false,
    });

    // 组件初始化时， 弹窗需要的参数
    this.dialogBoxParam = {
      title: '添加部门',
      confirm: this.saveAddSection,
    };
    // 设置用户状态选择框数据
    this.userStatusList = [
      // { value: 'all', label: '全部' },
      // { value: 'not_Active', label: '未激活' },
      // { value: 'activated', label: '已激活' },
      // { value: 'freeze', label: '已冻结' },
      { value: '全部', label: '全部' },
      { value: '未激活', label: '未激活' },
      { value: '已激活', label: '已激活' },
      { value: '已冻结', label: '已冻结' },
    ];
    // 初始化 过滤条件中的用户状态
    this.userStatus = '全部';
    this.oldUserStatus = this.userData;

  }

  /**
   * 清除部门搜索框内容方法
   * @param {tree} 部门列表中的数据
   * @memberof SectionUserManageComponent
   */
  public clearSectionSearchInput() {
    this.searchSection = '';
    this.filterNodes('');
  }

  /**
   * 部门列表点击选中事件
   * @memberof SectionUserManageComponent
   */
  public sectionListSelectedEvent(event) {
    if ( event.node ) {
      this.sectionSelectedNode = event.node;
    }
    // 获取用户列表信息
    this.getUserListInfo();
  }

  /**
   * 部门列表搜索结果处理方法
   * @param {text} 搜索的内容
   * @param {tree} 部门列表中的数据
   * @memberof SectionUserManageComponent
   */
  public filterNodes(text) {
    if (this.sectionTreeOne) {
      this.sectionTreeOne.treeModel.filterNodes(text);
    } else if (this.sectionTreeTwo) {
      this.sectionTreeTwo.treeModel.filterNodes(text);
    }
  }

  /**
   * 名字格式验证： 中文、字母、数字、“-”、“_”，1-20个字符
   * @param {control} 表单数据
   * @memberof SectionUserManageComponent
   */
  public SectionNameValidator(control: FormControl): { [s: string]: boolean } {
    const EMAIL_REGEXP = /^([A-Za-z0-9_\u4E00-\u9FA5]|-)+$/;
    if (!control.value) {
      return { required: true };
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, name: true };
    }
  }

  /**
   * 手机号格式验证
   * @param {control} 表单数据
   * @memberof SectionUserManageComponent
   */
  public phoneNumberValidator (control: FormControl): { [s: string]: boolean } {
    const phoneNumber_REGEXP = /^1(3|4|5|7|8)\d{9}$/;
    if (!control.value) {
      return { required: true };
    } else if (!phoneNumber_REGEXP.test(control.value)) {
      return { error: true, mobileNum: true };
    }
  }

  /**
   * 弹窗取消按钮事件： 重置表单数据
   * @param {event} 网页上的事件
   * @memberof SectionUserManageComponent
   */
  public cancelAddSection(event) {
    // https://ng.ant.design/version/0.5.x/#/components/form  搜：自定义异步校验
    this.addDialogBox = false;        // 关闭弹窗
    this.showUpperSection = false;    // 关闭弹窗中上级部门的下拉列表
    event.preventDefault();           // 阻止当前触发事件的默认行为。
    this.addSectionForm.reset();      // 重置Form表单数据
    for (const key in this.addSectionForm.controls) {
      this.addSectionForm.controls[key].markAsPristine();
    }
  }

  /**
   * 添加部门弹窗中， 点击部门事件
   * @param {event} 点击事件
   * @param {whichClick} 哪个表单
   * @memberof SectionUserManageComponent
   */
  public addUpperSectionClick(event, whichClick) {
    this.showUpperSection = false;
    if (event.node ) {
      if (whichClick === 'department') {
        // 如果是添加部门、编辑部门
        this.addSectionForm.value.upperSection = event.node.data.name;
        this.sectionId = event.node.data.id;
      } else if (whichClick === 'user') {
        // 如果是添加用、编辑用户
        this.addUserForm.value.department = event.node.data.name;
      }
    }
  }

  /**
   * 添加部门按钮
   * @memberof SectionUserManageComponent
   */
  public addDialogBtn() {
    this.addSectionForm = this.fb.group({
      name: [ null, [this.SectionNameValidator]],                                 // 部门名称
      upperSection: [this.sectionSelectedNode.data.name, [Validators.required]],  // 上级部门
      id: Math.round(Math.random() * 50),                                         // 部门ID
      verify: false,                                                              // 弹窗校验信息
    });
    this.addDialogBox = true;     // 显示弹窗
    this.dialogBoxParam = {
      title: '添加部门',
      confirm: this.saveAddSection,
    };
  }

  /**
   * 编辑部门按钮
   * @memberof SectionUserManageComponent
   */
  public editDialogBtn() {
    this.addSectionForm = this.fb.group({
      name: [this.sectionSelectedNode.data.name, [this.SectionNameValidator]],            // 部门名称
      upperSection: [this.sectionSelectedNode.parent.data.name, [Validators.required]],   // 上级部门
      id: this.sectionSelectedNode.data.id,                                               // 部门ID
      verify: false,                                                                      // 弹窗校验信息
    });
    this.addDialogBox = true;     // 显示弹窗
    // 弹窗需要的参数
    this.dialogBoxParam = {
      title: '编辑部门',
      confirm: this.saveEditSection,
    };
  }

  /**
   * 删除部门按钮
   * @memberof SectionUserManageComponent
   */
  public deleteSectionBtn() {
    const that = this;
    // 如果有子节点，提示：请先删除该部门的子部门，再删除该部门
    if (this.sectionSelectedNode.data.children.length !== 0) {
      this.notification.create('warning', '删除部门被终止', '请先删除该部门的子部门，再删除该部门');
      return;
    } else if ( false) {
      // TODO: 部门下有用户，停止删除，并提示
    } else {
      // 确认删除提示框
      this.confirmServ.confirm({
        title: `您确定要删除${this.sectionSelectedNode.data.name}吗？`,
        onOk() {
          that.deleteSectionNode(that.nodes);                     // 删除一个部门
          that.refreshSectionList = !that.refreshSectionList;     // 刷新部门列表
          // 删除成功后提示
          that.notification.create('success', '删除部门成功！', '');
        },
        onCancel() {
        }
      });
    }
  }

  /**
   * 部门排序按钮
   * @memberof SectionUserManageComponent
   */
  public sectionSortBtn() {
    this.showDepartmentDIV = true;            // 显示保存 取消 按钮。
    this.options.allowDrag = true;            // 允许树节点退拽
  }

  /**
   * 部门 排序取消 按钮
   * @memberof SectionUserManageComponent
   */
  public cancelSortBtn() {
    this.showDepartmentDIV = false;           // 显示 添加 编辑 删除 排序 按钮
    this.options.allowDrag = false;           // 禁止树节点退拽
  }

  /**
   * 编辑部门保存按钮 ： 把新的部门添加到部门列表中，关闭弹窗。
   * @param {that} 组件中this指针， 当这个方法赋给变量的时候，this不管用
   * @memberof SectionUserManageComponent
   */
  public saveEditSection(that) {
    // 必填项校验，如果有没填的选项提示
    if (!that.addSectionForm.value.name || that.addSectionForm.value.name === '') {
      that.addSectionForm.value.verify = true;
      return;
    } else {
      that.addSectionForm.value.verify = false;
    }
    // 编辑部门节点
    that.editSectionNode(that.nodes);
    that.refreshSectionList = !that.refreshSectionList;                     // 刷新部门列表
    that.notification.create('success', '编辑部门成功', '');
    that.addDialogBox = false;                                              // 关闭添加部门弹窗
  }

  /**
   * 编辑部门节点， 后期有后台API之后，这个方法就没用了。
   * @param {nodes} 部门树 的数据
   * @memberof SectionUserManageComponent
   */
  public editSectionNode(nodes) {
    // 如果只是修改部门名称
    if (this.sectionSelectedNode.parent.data.id === this.addSectionForm.value.id) {
      this.updateSectionNode(nodes);
    } else {
      // 先删除编辑的这个节点，
      this.deleteSectionNode(nodes);
      // 添加这个节点
      this.addSectionNode(nodes);
    }
  }

  /**
   * 仅修改节点名称， 后期有后台API之后，这个方法就没用了。
   * @param {nodes} 部门树 的数据
   * @memberof SectionUserManageComponent
   */
  public updateSectionNode(nodes) {
    for (const row of nodes) {
      row.isExpanded = true;    // 把节点展开
      // 在这个节点的子节点上找。如果找到了，修改这个子节点
      for (let i = 0; i < row.children.length; i++) {
        if (row.children[i].id === this.addSectionForm.value.id) {
          row.children[i].name = this.addSectionForm.value.name;
          return 'added';
        }
      }
      // 如果这个子节点没有，那么进入每个子节点里面去找，找到后返回。
      if (row.children && row.children.length !== 0) {
        if ('added' === this.deleteSectionNode(row.children)) {
          return 'added';
        }
      }
    }
  }

  /**
   * 删除一个节点， 后期有后台API之后，这个方法就没用了。
   * @param {nodes} 部门树 的数据
   * @memberof SectionUserManageComponent
   */
  public deleteSectionNode(nodes) {
    for (const row of nodes) {
      row.isExpanded = true;    // 把节点展开
      // 在这个节点的子节点上找。如果找到了，删除这个子节点
      for (let i = 0; i < row.children.length; i++) {
        if (row.children[i].id === this.sectionSelectedNode.data.id) {
          row.children.splice(i, 1);
          return 'added';
        }
      }
      // 如果这个子节点没有，那么进入每个子节点里面去找，找到后返回。
      if (row.children && row.children.length !== 0) {
        if ('added' === this.deleteSectionNode(row.children)) {
          return 'added';
        }
      }
    }
  }

  /**
   * 添加部门保存按钮 ： 把新的部门添加到部门列表中，关闭弹窗。
   * @param {that} 组件中this指针， 当这个方法赋给变量的时候，this不管用
   * @memberof SectionUserManageComponent
   */
  public saveAddSection(that) {
    // 必填项校验，如果有没填的选项提示
    if (!that.addSectionForm.value.name || that.addSectionForm.value.name === '') {
      that.addSectionForm.value.verify = true;
      return;
    } else {
      that.addSectionForm.value.verify = false;
    }
    that.addSectionNode(that.nodes);
    that.sectionSelectedNode.data.name = that.addSectionForm.value.name;    // 让部门列表在添加一个部门后选中这个新部门
    that.refreshSectionList = !that.refreshSectionList;                     // 刷新部门列表
    that.notification.create('success', '添加部门成功', '');                  // 添加成功提示
    that.addDialogBox = false;                                              // 关闭添加部门弹窗
  }

  /**
   * 添加一个节点到部门列表中， 后期有后台API之后，这个方法就没用了。
   * @param {nodes} 部门树 的数据
   * @memberof SectionUserManageComponent
   */
  public addSectionNode(nodes) {
    for (const row of nodes) {
      if (this.addSectionForm.value.upperSection === row.name) {
        row.isExpanded = true;    // 把节点展开
        const node = {
          id: this.addSectionForm.value.id, name: this.addSectionForm.value.name, isExpanded: true, children: []
        };
        row.children.push(node);
        return 'added';
      }
      if (row.children && row.children.length !== 0) {
        if ('added' === this.addSectionNode(row.children)) {
          return 'added';
        }
      }
    }
  }

  /**
   * 对话框空白处点击事件，用于取消部门列表下拉款
   * @memberof SectionUserManageComponent
   */
  public dialogBlankEvent() {
    this.showUpperSection = false;    // 关闭部门列表下拉款
  }


  saveDepartmentSortBtn() {
    if (this.sectionTreeOne) {
      this.notification.create('success', '部门排序成功', '');
      console.log(this.sectionTreeOne.treeModel.nodes);
    } else if (this.sectionTreeTwo) {
      this.notification.create('success', '部门排序成功', '');
      console.log(this.sectionTreeTwo.treeModel.nodes);
    }
    this.showDepartmentDIV = false;           // 显示 添加 编辑 删除 排序 按钮
  }

  /* 下面是用户列表需要的方法*/

  /**
   * 获取用户列表信息。
   * @memberof SectionUserManageComponent
   */
  public getUserListInfo() {
    // 清空用户列表数据
    this.userData = [];
    if (this.checkedBox) {
      // 勾选了 部门及一下
      if (this.sectionSelectedNode.data.name === this.nodes[0].name) {
        // 如果是顶级节点
        this.traversalTree(this.nodes);
      } else {
        // 没有勾选 部门及一下按钮
        this.traversalTree([this.sectionSelectedNode.data]);
      }
    } else {
      // 如果这个节点的部门有用户，这个节点的用户添加到用户列表里面
      if (userData[this.sectionSelectedNode.data.name]) {
        this.userData = this.userData.concat(userData[this.sectionSelectedNode.data.name]);
      }
    }
  }

  /**
   * 遍历 部门树，根据部门查取部门下的用户列表
   * @param {nodes} 部门树 的数据
   * @memberof SectionUserManageComponent
   */
  public traversalTree(nodes) {
    for (const row of nodes) {
      // 如果这个节点的部门有用户，这个节点的用户添加到用户列表里面
      if (userData[row.name]) {
        this.userData = this.userData.concat(userData[row.name]);
      }
      // 如果这个节点有子节点进入子节点继续添加用户
      if (row.children && row.children.length !== 0) {
        this.traversalTree(row.children);
      }
    }
  }

  /**
   * 用户状态选择框发生改变时触发事件
   * @param {event} 页面的点击事件数据
   * @memberof SectionUserManageComponent
   */
  public changUserStatus(event) {
    // 关闭下拉框， 并且修改了用户状态，则触发查询对应的数据
    if (!event && this.userStatus !== this.oldUserStatus) {
      this.oldUserStatus = this.userStatus;
      // 查询数据
      this.getUserListInfo();
      this.filterUserDataToStatus();
    }
  }

  /**
   * 根据用户状态 过滤用户数据
   * @memberof SectionUserManageComponent
   */
  private filterUserDataToStatus() {
    const tmpData = [];
    // 如果选择的是全部状态, 则不需要过滤，直接返回
    if (this.userStatusList[0].value === this.userStatus) {
      return;
    }
    for (const row of this.userData) {
      if (row.status === this.userStatus) {
        tmpData.push(row);
      }
    }
    this.userData = tmpData;
  }

  /**
   * 编辑用户按钮，点击响应方法
   * @param {data} 用户数据
   * @memberof SectionUserManageComponent
   */
  public editUserDialogBtn(data) {
    this.addUserDialogBox = true;         // 显示添加用户弹窗
    // 编辑用户表单数据
    this.addUserForm = this.fb.group({
      name: [data.userName, [this.SectionNameValidator]],
      mobileNum: [data.mobileNum, [this.phoneNumberValidator]],
      sex: data.sex,
      department: [data.department, [Validators.required]],
      job: data.job,
      email: data.email,
      verify: false,
    });
    // 设置弹窗需要的参数
    this.dialogBoxParam = {
      title: '编辑用户',
      confirm: this.saveEditUserInfo,
    };
  }

  /**
   * 编辑用户弹窗 确定按钮： 保存用户信息
   * @memberof SectionUserManageComponent
   */
  public saveEditUserInfo(that) {
    // 必填项校验，如果有没填的选项提示
    that.addUserForm.value.verify = that.validationUserRequire(that);
    if (that.addUserForm.value.verify) {
      return;
    }
    console.log('编辑用户信息成功,等待API接口，现在并没有修改数据：', that.addUserForm.value);
    that.notification.create('success', '编辑用户成功', '');  // 添加成功提示信息
    that.getUserListInfo();                                 // 刷新列表，从新获取用户列表
    that.addUserDialogBox = false;                          // 关闭添加用户弹窗
  }

  /**
   * 添加用户按钮，点击响应方法
   * @memberof SectionUserManageComponent
   */
  public addUserDialogBtn() {
    this.addUserDialogBox = true;         // 显示添加用户弹窗
    // 添加用户弹窗表单数据
    this.addUserForm = this.fb.group({
      name: [null, [this.SectionNameValidator]],
      mobileNum: [null, [this.phoneNumberValidator]],
      sex: null,
      department: [this.sectionSelectedNode.data.name, [Validators.required]],    // 默认选中当前的部门
      job: null,
      email: null,
      verify: false,
    });
    // 设置弹窗需要的参数
    this.dialogBoxParam = {
      title: '添加用户',
      confirm: this.saveAddUserInfo,
    };
  }

  /**
   * 刷新用户按钮，点击响应方法
   * @memberof SectionUserManageComponent
   */
  public reloadUserIndfo() {
    this.getUserListInfo();                                     // 获取用户数据
    this.notification.create('success', '刷新用户列表成功', '');   // 刷新成功提示信息
  }

  /**
   * 取消添加用户弹窗按钮：  关闭弹窗、重置表单
   * @memberof SectionUserManageComponent
   */
  public cancelAddUserDialog(event) {
    this.addUserDialogBox = false;        // 关闭添加用户弹窗
    event.preventDefault();               // 阻止当前触发事件的默认行为。
    this.addUserForm.reset();             // 重置Form表单数据
    for (const key in this.addUserForm.controls) {
      this.addUserForm.controls[key].markAsPristine();
    }
  }

  /**
   * 添加用户弹窗 确定按钮： 保存用户信息
   * @memberof SectionUserManageComponent
   */
  public saveAddUserInfo(that) {
    // 必填项校验，如果有没填的选项提示
    that.addUserForm.value.verify = that.validationUserRequire(that);
    if (that.addUserForm.value.verify) {
      return;
    }
    // 如果这个部门没有数据，创建一个空数据
    if (!userData[that.addUserForm.value.department]) {
      userData[that.addUserForm.value.department] = [];
      console.log(userData);
    }
    const data = {
      userName: that.addUserForm.value.name, mobileNum: that.addUserForm.value.mobileNum,
      department: that.addUserForm.value.department,
      job: that.addUserForm.value.job, status: null,
      sex: that.addUserForm.value.sex, email: that.addUserForm.value.email
    };
    // 存储数据
    userData[that.addUserForm.value.department].push(data);
    that.notification.create('success', '添加用户成功', '');  // 添加成功提示信息
    that.getUserListInfo();                                 // 刷新列表，从新获取用户列表
    that.addUserDialogBox = false;                          // 关闭添加用户弹窗
  }

  /**
   * 校验添加用户必填项，
   * return： true： 有没填的选项， false： 校验通过
   * @memberof SectionUserManageComponent
   */
  validationUserRequire(that) {
    // 必填项校验，如果有没填的选项提示
    if (!that.addUserForm.value.name || that.addUserForm.value.name === '') {
      return true;
    } else if (!that.addUserForm.value.mobileNum || that.addUserForm.value.mobileNum === '') {
      return true;
    } else if (!that.addUserForm.value.department || that.addUserForm.value.department === '') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 查看用户信息
   * @memberof SectionUserManageComponent
   */
  showUserInfoModal(titleTpl, contentTpl, footerTpl, data) {
    this.userInfo = data;     // 获取用户信息
    this.showUserModal = this.confirmServ.open({
      title: titleTpl,
      content: contentTpl,
      footer: footerTpl,
      maskClosable: false,
      onOk() {
        // 确定按钮的出发事件处理函数，需要在销毁的时候带上这个函数名字。this.showUserModal.destroy('onOk'); 才能生效
      }
    });
  }

  /**
   * 查看用户信息弹窗的 确定按钮
   * @memberof SectionUserManageComponent
   */
  public handleOk(e) {
    this.showUserModal.destroy();
    this.showUserModal = null;
  }

  /**
   * 删除用户按钮
   * @memberof SectionUserManageComponent
   */
  public deleteUserInfo(data) {
    const that = this;    //  确认按钮方法里面不识别this
    // 确认删除提示框
    this.confirmServ.confirm({
      title: `您确定要删除${data.userName}吗？`,
      content: '移除后该用户将无法登录本企业',
      onOk() {
        for (let i = 0; i < that.userData.length; i++) {
          if (that.userData[i].userName === data.userName) {
            that.userData.splice(i, 1);
            break;
          }
        }
        // 用户数据放在一个新的数据里面，否则数据少了，但是页面并没有少
        that.userData = [].concat(that.userData);
        // 删除成功后提示
        that.notification.create('success', '删除用户成功！', '');
      },
      onCancel() {
        // 取消删除事件处理
      }
    });
  }

  /**
   * 发送激活短信按钮
   * @memberof SectionUserManageComponent
   */
  public sendActivationMessage() {
    // 页面提示
    this.notification.create('success', '短信发送成功，请注意查收！', '');
  }

  /**
   * 冻结提示框
   * @memberof SectionUserManageComponent
   */
  public freezesUser(data) {
    const that = this;    //  确认按钮方法里面不识别this
    // 确认冻结提示框
    this.confirmServ.confirm({
      title: `您确定要冻结${data.userName}吗？`,
      content: '冻结后该用户将无法登录本企业',
      onOk() {
        data.status = '已冻结';
        // 删除成功后提示
        that.notification.create('success', '冻结用户成功！', '');  // 添加成功提示信息
      },
      onCancel() {
      }
    });
  }

  /**
   * 解冻提示框
   * @memberof SectionUserManageComponent
   */
  public freeUser(data) {
    const that = this;    //  确认按钮方法里面不识别this
    // 确认解冻提示框
    this.confirmServ.confirm({
      title: `您确定要解冻${data.userName}吗？`,
      content: '解冻后该用户将可以登录本企业',
      onOk() {
        data.status = '已激活';
        // 解冻成功提示
        that.notification.create('success', '解冻用户成功！', '');
      },
      onCancel() {
      }
    });
  }

}
