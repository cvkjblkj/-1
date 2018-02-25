import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from './../../../../core/services/conmmon.service';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'enterprise-info',
  templateUrl: 'enterprise-info.component.html',
  styleUrls: ['enterprise-info.component.scss']
})

export class EnterpriseInfoComponent implements OnInit {
  enterpriseValue = true; // 用户情况表格状态
  isVisible = false; // 弹出框的状态
  option: any; // echarts数据
  _endDate = new Date(this.commonService.formatDate(new Date()).formcatDate); // 初始化结束时间
  _startDate = new Date(this.commonService.formatDate(this.commonService.formatDate(this._endDate).times - 604800000).formcatDate); // 初始化开始时间
  _dataSet = []; // 列表数据
  widthValue = '600px';
  constructor(
    private commonService: CommonService

  ) { }
  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      // for (let i = 0; i < 0; i++) {
      this._dataSet.push({
        key: i,
        name: `兽人永不为奴${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        number: i + 1,
        colorName: '红色' + i + 10,
        oracle: 'oracle----01928392981----' + i + 100,
      });
    };
    this.option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['最高气温']
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
          name: '最高气温',
          type: 'line',
          data: [11, 11, 15, 13, 12, 13, 10],
        },
      ]
    };
  };

  /**
   * 弹出弹出框框
   */
  spanClick() {
    this.isVisible = true;
  };
  /**
   * 弹出框
   * 全部发送短信
   */
  handleOk = (e, E) => {
    console.log(E);
    // setTimeout(() => {
    //   this.isVisible = false;

    // }, 3000);
  }
  /**
   * 弹出框取消事件
   */
  handleCancel = (e) => {
    this.isVisible = false;
  }
  /**时间选择处理函数 */
  newArray = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  };
  _startValueChange = () => {
    if (this._startDate > this._endDate) {
      this._endDate = null;
    }
  };
  _endValueChange = () => {
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
  };
  _disabledStartDate = (startValue) => {
    if (!startValue || !this._endDate) {
      return false;
    }
    return startValue.getTime() >= this._endDate.getTime();
  };
  _disabledEndDate = (endValue) => {
    if (!endValue || !this._startDate) {
      return false;
    }
    return endValue.getTime() <= this._startDate.getTime();
  };

  /**
   * 弹出框的点击事件
   * @param e
   */
  clickMessage(e) {
    console.log(e);
  }

}
