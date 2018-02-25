import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

declare var $: any;
@Component({
  selector: 'photo-switch',
  templateUrl: './photo-switch.component.html',
  styleUrls: ['./photo-switch.component.scss']
})
export class PhotoSwitchComponent implements OnInit {
  @Input() pictureList: any; // 图片集合
  @Input() keyCodeEvent: boolean; // 是否添加键盘事件，默认为false, 如果为true，可以点击图片进行切换
  @Output() switchBtnPic = new EventEmitter();  // 点击左右按钮 图片切换

  public movingDistance = 110; //移动的距离
  public curWidth = 115; //变大后的宽度
  public curHeight = 170; //  变大后的高度
  public curImgWidth = 115;
  public curImgHeight = 124;
  public othersW = 85; // 正常的宽度
  public othersH = 115; //正常的高度
  public othersImgW = 85; //正常的图片宽度
  public othersImgH = 97; //正常的图片高度
  public totalPanels;  //元素的数量 8
  public curPanel = 1; // 当前选中的图片
  constructor() {
    this.keyCodeEvent = false;

  }

  ngOnChanges(changes: SimpleChanges) {
    let _this = this;
    if (this.pictureList) {
      $('#slider .scrollContainer > li img').each(function (i) {
        this.data("info", _this.pictureList[i].id);
      })
    }
  }

  ngOnInit() {
    let $panels = $('#slider .scrollContainer > li');
    let $parent = $panels.parent(); //
    let $length = $panels.length; //li元素的数量
    let $first = $panels.eq(0).clone().addClass("panel-logo cloned").attr("id", 'panel_' + ($length + 1)); //第一个元素 克隆
    let $last = $panels.eq($length - 1).clone().addClass("cloned").attr("id", 'panel_0');; //最后一个元素
    $parent.append($first); //将第一个元素放置到列表最后  $("#slide02").scrollLeft(0);
    $parent.prepend($last); //将最后元素放置到列表最开始
    $panels = $('#slider .scrollContainer > li'); //所有的li元素
    $panels.css({ 'float': 'left', 'position': 'relative' });
    let regWidth = $(".panel").css("width"); //每一个li的宽度
    let regImgWidth = $(".panel img").css("width"); //每一个li中图片的宽度
    let $container = $('#slider .scrollContainer'); // ul元素
    $("#slider").data("currentlyMoving", false); //给 最外层 div 增加数据
    $container.css('width', (($panels[0].offsetWidth + 25) * $panels.length) + 60).css('left', '0'); // 当前父元素的宽度
    let scroll = $('#slider .scroll').css('overflow', 'hidden');

    this.totalPanels = $(".scrollContainer").children().length;
    let _that = this;
    this.pictureList = this.pictureList ? this.pictureList : [];

    this.growBigger("#panel_1");
    $("#panel_" + (this.curPanel + 1)).click(function () { _that.change(true); return false; });
    $("#panel_" + (this.curPanel - 1)).click(function () { _that.change(false); return false; });
    $("#slider .next").click(function () { _that.change(true); });
    $("#slider .prev").click(function () { _that.change(false); });

  }

  public returnToNormal(element) { // 变回正常的大小
    $(element).animate({ width: this.othersW, height: this.othersH }).find("img").animate({ width: this.othersImgW, height: this.othersImgH });
  };

  public growBigger(element) { // 变成 选中状态的大小
    $(element).addClass("current").animate({ width: this.curWidth, height: this.curHeight }).siblings().removeClass("current")
      .end().find("img").animate({ width: this.curImgWidth, height: this.curImgHeight });
    // 获取选中图片的值
    let content = $(".current").find("img").attr("alt");
    $(".select-img").text(content);
    let data = $(".current").find("img").data("info");
    this.switchBtnPic.emit(data);
  }

  /**
   * 元素移动事件
   * 点击按钮或者图片的 向左向右的移动
   * @param {any} direction 移动的方向
   * @returns 
   * @memberof PhotoSwitchComponent
   */
  public change(direction) {

    //如果不是在第一个或最后一个
    if ((direction && !(this.curPanel < this.totalPanels - 2)) || (!direction && (this.curPanel <= 1))) {
      return false;
    }
    //如果目前没有移动
    if (($("#slider").data("currentlyMoving") == false)) {
      $("#slider").data("currentlyMoving", true);
      var next = direction ? this.curPanel + 1 : this.curPanel - 1;
      var leftValue = $(".scrollContainer").css("left");
      //   移动的left的值
      var movement = direction ? parseFloat(leftValue) - this.movingDistance : parseFloat(leftValue) + this.movingDistance;
      console.log(movement);
      $(".scrollContainer").stop().animate({ "left": movement }, function () {
        $("#slider").data("currentlyMoving", false);
      });
      this.returnToNormal("#panel_" + this.curPanel);
      //   给当前元素增加状态
      this.growBigger("#panel_" + next);
      //   下一个元素
      this.curPanel = next;
      //remove all previous bound functions
      $("#panel_" + (this.curPanel + 1)).unbind();
      //go forward
      $("#panel_" + (this.curPanel + 1)).click(() => { this.change(true); });
      //remove all previous bound functions															
      $("#panel_" + (this.curPanel - 1)).unbind();
      //go back
      $("#panel_" + (this.curPanel - 1)).click(() => { this.change(false); });
      //remove all previous bound functions
      $("#panel_" + this.curPanel).unbind();
    }
  }
}
