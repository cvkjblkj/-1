import { Component } from '@angular/core';
import { Router } from '@angular/router';                                                   // 路由跳转
import { GlobalSubscribeService } from '../../theme/services/global-subscribe.service';     // 服务通讯，菜单的展开、收缩事件

@Component({
  selector: 'app-root',
  providers: [
    GlobalSubscribeService,
  ],
  styles: [
    // 菜单展开状态下主页面样式
    '.app-content {' +
    ' position: absolute;' +      // 去掉滚动条
    ' top: 60px;' +
    ' right: 0;' +
    ' margin: 0;' +
    // ' height: 100%;' +         // 高度占满
    '}'  +
    '.app-main-menu {' +
    ' left:240px;' +
    '}' +
    '.app-main-menu-small {' +
    ' left:60px;' +
    '}'
  ],
  template: `
  <app-head-navigation></app-head-navigation>
  <!--这里使用了隐藏，因为销毁会导致路由订阅第一次失效（导致菜单没有默认选中），-->
  <!--<app-menu-item *ngIf="!hiddenMenu"></app-menu-item>-->
  <app-menu-item [hidden]="hiddenMenu"></app-menu-item>
  <div class="app-content" [ngClass]="showMenuClass">
    <router-outlet></router-outlet>
  </div>
  `,
})
export class AppComponent {
  // title = 'app';
  public menuContractile: any = false;  // 菜单的状态： true 收缩， false 展开
  public showMenuClass: {};             // 当有菜单时，页面样式
  public hiddenMenu = false;            // 是否隐藏菜单 true 隐藏， false 显示

  constructor(public router: Router,
    public globalSubscribeService: GlobalSubscribeService,
  ) {
    // 判断路径变化，如果是登陆页面则隐藏菜单组件
    this.router.events.subscribe((events: any) => {
      // 如果是登陆页面则隐藏菜单组件
      if (events && events.url && events.url.indexOf('/login') !== -1) {
        this.hiddenMenu = true;
        this.setShowMenuClass();
      } else {
        this.hiddenMenu = false;
        this.setShowMenuClass();
      }
    });

    // 当菜单展开、收缩的时候，页面跟随变化
    this.globalSubscribeService.getSubscribe.subscribe(
      data => {
        if ('contractile menu' === data) {
          this.menuContractile = true;     // 菜单收缩
          // 每次发消息都从新赋值
          this.setShowMenuClass();
        } else if ('extend menu' === data) {
          this.menuContractile = false;    // 菜单展开
          // 每次发消息都从新赋值
          this.setShowMenuClass();
        }
      }
    );
    // 初始化的时候，设置 主窗口样式
    this.setShowMenuClass();
  }

  /**
   * 主窗口样式设置
   * @memberof AppComponent
   */
  public setShowMenuClass() {
    this.showMenuClass = {
      'app-main-menu': !this.hiddenMenu && !this.menuContractile,
      'app-main-menu-small': !this.hiddenMenu && this.menuContractile,
    };
  }
}
