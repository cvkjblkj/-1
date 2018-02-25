import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../../core/services/conmmon.service';
import * as moment from 'moment';
@Component({
  selector: 'application-info',
  templateUrl: 'application-info.component.html',
  styleUrls: ['application-info.component.scss;./../../enterprise-info/enterprise-info.component.scss']
})

export class ApplicationInfoComponent implements OnInit {
  enterpriseValue = true; // 用户情况表格状态
  option: any; // 图表数据
  _endDate = new Date(this.commonService.formatDate(new Date()).formcatDate); // 初始化结束时间
  _startDate = new Date(this.commonService.formatDate(this.commonService.formatDate(this._endDate).times - 604800000).formcatDate); // 初始化开始时间
  _dataSet = []; // 列表数据
  constructor(
    private commonService: CommonService
  ) { }
  ngOnInit() {
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

}
