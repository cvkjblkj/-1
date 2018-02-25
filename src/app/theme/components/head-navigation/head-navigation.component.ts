import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';           // 用于检测路由变化，以便于更改头部背景色、提示等

@Component({
  selector: 'app-head-navigation',
  templateUrl: './head-navigation.component.html',
  styleUrls: ['./head-navigation.component.scss']
})
export class HeadNavigationComponent implements OnInit {
  public userName: any;         // 用户名
  public routeInfo: any;        // 路由的路径信息
  test: any;
  constructor(
    private router: Router,
  ) {
    this.test = false;
    this.userName = '我是测试的名字';
  }

  ngOnInit() {
    // 路由订阅，判断进入的是哪个页面，根据页面的不同头部样式不同
    this.router.events.subscribe((events: any) => {
      if (events && events.url && events.url.indexOf('/login') !== -1) {
        this.routeInfo = 'login';
      } else {
        this.routeInfo = '';
      }
    });
  }

}
