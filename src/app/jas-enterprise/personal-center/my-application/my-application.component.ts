import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.scss']
})
export class MyApplicationComponent implements OnInit {
  public Property: boolean = true; // 已授权的得模板状态
  public newIsVisible: boolean = false; // 退出弹出框的状态
  public enterprise: any; // 企业全局变量
  public collection = [

    {
      name: '沐沐科技有限公司',
      num1: 1,
      department: '人事部',
      position: '人事助理',
      time: '2017-11-22',
      status: '已激活',
      description: '也许是我不懂的事太多,也许是我的错,也许一切已是慢慢的错过,也许不必再说,从未想过你我会这样结束 ',
      num: 1,
      img: './../../../../assets/img/favicon.png',
      url: 'https://www.baidu.com/'
    },
    {
      name: '大想子科技有限公司',
      num2: 2,
      department: '销售部',
      position: '经理',
      num: 2,
      time: '2017-2-22',
      status: '已激活',
      description: '也许是我不懂的事太多,也许是我的错,也许一切已是慢慢的错过,也许不必再说,从未想过你我会这样结束,',
      img: './../../../../assets/img/logo.png',
      url: 'http://192.168.100.92/#/login'
    }

  ]
  constructor(
    private router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  /**
   * 
   * @param e 进入企业
   */

  public handle(e) {
    console.log(e.url)
    // this.urlToOpen =''
    // let url: string = 'www.baidu.com';
    // if (!/^http[s]?:\/\//.test(this.urlToOpen)) {
    //   url += 'http://';
    // }

    // url += this.urlToOpen;
    window.open(e.url, '_blank');
    // window.open("", "_blank");
  };
  /**
   * 退出企业
   * @param e 
   */
  public signout(e) {
    console.log(e)
    this.newIsVisible = true;
    this.enterprise = e;
  };
  /**
   * 申请加入
   * @param e 
   * @param E 
   */
  public application(e, E) {
    // console.log(e);
    console.log(E)
    this.collection[E].num = 0;
    console.log(this.collection[E])
  };
  /**
   * 
   * @param e 重新加入企业
   * @param E 
   */
  public again(e, E) {
    console.log(e);
    console.log(E);
    this.collection[E].num = 0;
    console.log(this.collection[E])
  };
  /**
   * 退出企业取消事件
   * @param e 
   */
  public newhandleCancel(e) {
    this.newIsVisible = false;
  };
  public newSendOk(e) {
    this.newIsVisible = false;
  }

}
