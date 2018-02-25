import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'patrol-guard',
  templateUrl: './patrol-guard.component.html',
  styleUrls: ['./patrol-guard.component.scss,./../../product-service.component.scss']
})
export class PatrolGuardComponent implements OnInit {
  public newIsVisible: boolean = false; // 停用弹出框的状态
  public isVisible: boolean = false; // 更换弹出框的状态
  public searchOptions = [
    { label: '监控类别', value: 'monitorType' },
    { label: '监控对象', value: 'monitorObject' },
    { label: '规则名称', value: 'ruleName' },
    { label: '状态', value: 'alarmHistoryStates' },
    { label: '通知人', value: 'notifyUserName' },
  ];
  constructor() { }

  ngOnInit() {
  }
  /**
   * 停止应用
   */
  public stop() {
    this.newIsVisible = true;
  };
  /**
 * 停用取消事件
 * @param e 
 */
  public newhandleCancel(e) {
    this.newIsVisible = false;
    this.isVisible = false;
  };
  /**
   * 停用确认
   * @param e 
   */
  public newSendOk(e) {
    this.newIsVisible = false;
  };
  /**
   * 更换
   */
  public change() {
    this.isVisible = true;
  };
  /**
   * 更换弹框确认按钮
   * @param e 
   */
  public sendOk(e) {
    this.isVisible = false;
  }
  // public search(e) {
  //   console.log(e.query)
  //   this.results = [
  //     { label: '监控类别', name: 'monitorType' },
  //     { label: '监控对象', name: 'monitorObject' },
  //     { label: '规则名称', name: 'ruleName' },
  //     { label: '状态', name: 'alarmHistoryStates' },
  //     { label: '通知人', name: 'notifyUserName' },
  //   ]
  // }

}
