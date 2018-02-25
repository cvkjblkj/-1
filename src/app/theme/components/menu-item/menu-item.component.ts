import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';           // 路由跳转
import { GlobalSubscribeService } from './../../services/global-subscribe.service';
import { CommonService } from '../../../core/services/conmmon.service';

@Component({
  providers: [CommonService],
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, OnDestroy {
  public isCollapsed = false;
  public browserURL = '';       // 当前浏览器里面的地址
  public menuSubscribe: any;
  public menuContent: any = [
    {
      name: '展示板',
      url: '/dashboard',
    },
    {
      name: '登陆',
      url: '/login',
    },
    {
      name: '首页',
      url: '/home/write-info'
    },
    {
      name: '产品服务',
      nzOpen: false,
      child: [
        { name: '巡线卫士', url: '/product-service/patrol-guard' },
        { name: '阴保管家', url: '/product-service/protection-manage' },
      ],
    },
    {
      name: '企业管理',
      nzOpen: false,
      child: [
        { name: '部门/用户管理管理', url: '/enp-manage/section-user-manage', },
        { name: '用户审核', url: '/enp-manage/user-audit', },
      ],
    },
    {
      name: '企业数据',
      nzOpen: false,
      child: [

        { name: '登录日志', url: '/enterprise-data/write-info' },
        { name: '操作日志', url: '/enterprise-data/handle-info' },
        { name: '统计信息', url: '/enterprise-data/statistics-info/enterprise-info' }
      ]
    },
    {
      name: '个人中心',
      nzOpen: false,
      child: [
        { name: '个人信息', url: '/personal-center/personal-info' },
        { name: '修改密码', url: '/personal-center/password-info' },
        { name: '我的企业', url: '/personal-center/myEnterprise-info/owned-enterprise' },
        { name: '我的应用', url: '/personal-center/my-application' },
        { name: '登录日志', url: '/personal-center/entry-info' },
      ]
    }
  ];
  constructor(public router: Router,
    public globalSubscribeService: GlobalSubscribeService,
    public commonService: CommonService,
  ) {
    // TODO 这个页面默认缺省路径时('/')。 还没有处理，此时需要后期调整，当输入'/'时，是没有选中菜单的
    this.menuSubscribe = this.router.events.subscribe((events: any) => {
      if (events && events.url) {
        this.browserURL = events.url;
        this.menuNgOpen();
      } else {
        this.browserURL = '';
      }
    });
  }

  ngOnInit() {
  }
  public toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      // 隐藏菜单消息发送
      this.globalSubscribeService.sendMessage('contractile menu');
    } else {
      // 显示菜单发送
      this.globalSubscribeService.sendMessage('extend menu');
    }
  }

  /**
   * 组件销毁时调用的方法
   * @memberof MenuItemComponent
   */
  ngOnDestroy() {
    this.menuSubscribe.unsubscribe();  // 销毁订阅
  }

  /**
   * 菜单是否展开事件处理方法
   * @memberof MenuItemComponent
   */
  private menuNgOpen() {
    for (const item of this.menuContent) {
      if (item.child && item.child.length !== 0) {
        for (const subItem of item.child) {
          if (this.browserURL.indexOf(subItem.url) !== -1) {
            item.nzOpen = true;
          } else if (item.nzOpen) {
            // item.nzOpen = false;
          }
        }
      }
    }
  }

  /**
   * 菜单点击事件处理方法
   * @param {any} url
   * @memberof MenuItemComponent
   */
  public menuClick(url) {
    const tmp = {
      // id: '1',
    };
    this.router.navigate([url], { queryParams: tmp });
  }

  /**
   * 二级菜单展开收缩点击事件处理方法
   * @param {any} item  二级菜单里面的内容
   * @memberof MenuItemComponent
   */
  public secondLevelClick(item) {
    item.nzOpen = !item.nzOpen;
  }

}
