import { Component, OnInit, OnChanges, AfterContentChecked } from '@angular/core';
import { EndterpriseService } from './../../shared';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'owned-enterprise',
  templateUrl: 'owned-enterprise.component.html',
  styleUrls: ['owned-enterprise.component.scss']
})

export class OwnedEnterpriseComponent implements OnInit, OnChanges, AfterContentChecked {
  public enterpriseName: any; // 企业名称
  public isVisible: boolean = false; // 弹出框的状态
  collection = [
    {
      name: '沐沐科技有限公司',
      num: 1,
      department: '人事部',
      position: '人事助理',
      time: '2017-11-22',
      status: '已激活'

    },
    {
      name: '川川科技有限公司',
      num: 2,
      department: '研发部',
      position: '工程师',
      time: '2017-2-22',
      status: '未激活'

    },
    {
      name: '大想子科技有限公司',
      num: 1,
      //num: 2,
      department: '销售部',
      position: '经理',
      time: '2017-2-22',
      status: '已激活'

    },
    {
      name: '狗轩科技有限公司',
      num: 3,
      department: '销售部',
      position: '经理',
      time: '2017-2-22',
      status: '已冻结'

    }
  ];
  public arr: any = [];
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public endterpriseService: EndterpriseService
  ) { }
  ngOnInit() {
    this.arr = this.changePosition(1, this.collection);
    console.log(this.arr);
  }
  ngOnChanges() {
    // if (this.endterpriseService.buttonStates === true) {
    //   console.log(11111);
    // }
    console.log(this.endterpriseService.buttonStates)
  }
  ngAfterContentChecked() {
    if (this.endterpriseService.buttonStates === true) {
      this.change();
    }
  }

  public change() {
    console.log(1111)
  }
  /** 
   * 把其中的某一项放在数组的最前边
  */
  // for (var i = 0; i < arr.length; i++) {
  // 	if (arr[i] === key) {
  // 		arr.splice(i, 1);
  // 		break;
  // 	}
  // }
  // arr.unshift(key);


  public changePosition(id, array) {
    var i, len = array.length;
    if (len === 0) { return false; }
    // if (array[0]['id'] === id) { return array; }
    for (i = 1; i < len; i = i + 1) {
      if (array[i]['num'] === 1) {
        array.unshift(array[i]);
        array.splice(i + 1, 1);
        break;
      }
    }
    return array;
  }

  /**
   * 取消默认
   */
  public handle = (e) => {
    console.log(e);
    e.num = 0;
  };
  /**
   * 设置默认
   */
  public setOk = (e) => {
    console.log(e);
    e.num = 1;
  }
  /**
   * 退出企业
   */
  public signout = (e: any) => {
    console.log(e);
    this.isVisible = true;
    this.enterpriseName = e['name'];


  };
  /**
   * 取消
   */
  handleCancel = (e) => {
    this.isVisible = false;
  };
  /**
   * 确认
   */
  handleOk = (e) => {
    console.log(e)
  };
}
