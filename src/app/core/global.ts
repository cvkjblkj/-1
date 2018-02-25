import { RequestOptions, Headers, } from '@angular/http';

export const INCONFIG = {
  userInfo: {}, // 登录的用户信息
  appCode: '',
  appId: '',
  viewTypeCode: '',
  viewTypeId: '',
  validateType: '',
  enterpriseId: "",  // 登录用户的企业id
  // 定义微服务名字
  fileServerSrc: '/cloudlink/cloudlink-core-file',
  frameworkServerSrc: '/cloudlink/cloudlink-core-framework/',
  zipkinServerSrc: '/cloudlink/zipkin/api',
  journalServerSrc: '/cloudlink/cloudlink-core-log',
  monitorServerSrc: '/cloudlink/cloudlink-core-log',
  IOTServerSrc: '/cloudlink/cloudlink-core-iot',
  // echat图表线条显示的颜色
  echartLineColor: ['#7CB5ED', '#F7A35C', '#2A918F', '#F15C81', '#E5D354', '#91ED7C', '#8185E9'],
  zn: {
    firstDayOfWeek: 0,
    dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
  },
  // token: window.localStorage["jasToken"],
  JsonHeader: new Headers({ 'Content-Type': 'application/json' }),
  options: new RequestOptions({ headers: this.JsonHeader }),

}
