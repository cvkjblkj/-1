import { Injectable } from '@angular/core';

export class CommonService {
  /**
* 转换中国标准时间
* @param date 格式：中国标准时间，yyyy-mm-dd,yyyy/mm/dd,毫秒数
* @return dates.times：当前时间的毫秒数
* @return dates.formcatDate：当前时间的新格式 yyyy-mm-dd
* @return dates.formatTime yyyy-mm-dd hh-mm
*/
  public formatDate(date) {
    let newDate;
    if (typeof (date) === 'string' && date.indexOf('-') !== -1) {
      newDate = date.replace(/-/g, '/');
    } else {
      newDate = date;
    }
    const dateObj: any = new Date(newDate);
    const year: any = dateObj.getFullYear();
    let month: any = dateObj.getMonth() + 1;
    let day: any = dateObj.getDate();
    const hours: any = dateObj.getHours();
    let mins: any = dateObj.getMinutes();
    let second: any = dateObj.getSeconds() ? dateObj.getSeconds() : '';
    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day; }
    if (mins < 10) { mins = '0' + mins; }
    if (second < 10) { second = '0' + second; }
    if (second === 0) { second = '00'; }
    const time = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + second;
    const timeIE = year + '/' + month + '/' + day + ' ' + hours + ':' + mins + ':' + second;
    const times = new Date(time).getTime() ? new Date(time).getTime() : new Date(timeIE).getTime(); // 得到毫秒数
    const dates = {
      times: times, // 毫秒数
      formcatDate: year + '-' + month + '-' + day,
      formatTime: year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + second,
      date: dateObj,
      monthDay: month + '-' + day,
    };
    // return  + " " + hours + ":" + mins + ":" + second;
    return dates;
  }

  /**
   * 阻止事件冒泡
   * @param e  事件对象
   */
  public stopBubble(e) {
    // 如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.stopPropagation) {
      // 因此它支持W3C的stopPropagation()方法
      e.stopPropagation();
    } else {
      // 否则，我们需要使用IE的方式来取消事件冒泡
      window.event.cancelBubble = true;
    }
  }
}
