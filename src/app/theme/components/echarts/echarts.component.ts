import { Component, OnInit, AfterViewInit, } from '@angular/core';
import { Input, Output, EventEmitter, OnChanges, ViewChild, NgZone, } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'echarts',
  templateUrl: 'echarts.component.html'
})
// const echarts = require('echarts');    // 加载echarts

export class EchartsComponent implements OnInit, OnChanges, AfterViewInit {
  constructor() {

  }
  private myEcharts: any; // 初始化echarts
  @ViewChild('ecahrtsMain') ecahrtsMain; // ecahrts 外层容器
  @Input() option: any;
  ngOnInit() {
    console.log(this.option);


  }
  ngOnChanges() {
    if (this.myEcharts) {
      this.myEcharts.setOption(this.option);
    }

  };
  ngAfterViewInit() {
    this.option = this.option ? this.option : {};
    this.myEcharts = echarts.init(this.ecahrtsMain.nativeElement);
    this.myEcharts.setOption(this.option);
    if (this.ecahrtsMain.nativeElement.children !== []) {

      this.ecahrtsMain.nativeElement.children[0].style.width = '100%';
      this.ecahrtsMain.nativeElement.children[0].children[0].style.width = '100%';
      // this.ecahrtsMain.nativeElement.children[0].children.style.width = '100%';
    }
    // loading动画
    // if (this.showLoading) {
    //   this.haveShowLoading();
    // }
    // this.myEcharts.setOption(this.option);
    // this.myEcharts.on('click', function (params) {
    //   console.log('click==');

    // });
  }
}
