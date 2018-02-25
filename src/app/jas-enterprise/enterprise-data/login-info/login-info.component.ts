import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from './../../../core/services/conmmon.service';
import * as $ from 'jquery';
@Component({
  selector: 'write-info',
  templateUrl: 'login-info.component.html',
  styleUrls: ['./../enterprise-data.component.scss']
})

export class LogoInfoComponent implements OnInit {
  constructor(
    private commonService: CommonService
  ) { }
  pageSize: any = '10'; // 页容量
  pageNum: any = 1; // 页码
  searchValue: any; // 搜索框内容
  selectName: any; // 搜索框name
  @ViewChild('nzTable') nzTable; // 获取列表元素
  _endDate = new Date(this.commonService.formatDate(new Date()).formcatDate); // 初始化结束时间
  _startDate = new Date(this.commonService.formatDate(this.commonService.formatDate(this._endDate).times - 604800000).formcatDate); // 初始化开始时间
  _dataSet = []; // 列表数组
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
   * 分页
   * @param e
   */
  PageIndexChange(e) {
    console.log('页码变化回调');
    console.log(e);
  }
  nzPageSizeChange(e) {
    console.log('数量变化回调');
    console.log(e);
  }

  ngOnInit() {
    this.selectName = 'searchName';
    this.initSearchData();
    this.addEnterEvent();
    for (let i = 0; i < 56; i++) {
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
    setTimeout(() => {
      this.nzTable.nzLoading = false;
    }, 1000);
  };

  addEnterEvent() {
    const _that = this;
    $('.input-search').bind('keypress', function (event) {
      if (event.keyCode === 13 && this === document.activeElement) {
        _that.initSearchData();
      }
    })
  };
  /**
   *初始化数据
   */
  initSearchData() {
    const params = {
      pageSize: this.pageSize,
      pageNum: this.pageNum,
      startTime: this.commonService.formatDate(this._startDate).times,
      endTime: this.commonService.formatDate(this._endDate).times
    };
    if (this.searchValue) {
      params[this.selectName] = this.searchValue ? this.searchValue : '';
    }
    console.log(params);
    // const _that = this;
  };
  /**
 * 按钮搜索
 */
  search() {
    this.initSearchData();
  };
}
