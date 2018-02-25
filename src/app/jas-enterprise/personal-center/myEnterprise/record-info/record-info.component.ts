import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'record-info',
  templateUrl: 'record-info.component.html',
  styleUrls: ['./record-info.component.scss']
})

export class RecordInfoComponent implements OnInit {
  public pageSize: any = '10'; // 页容量
  public pageNum: any = 1; // 页码
  public _dataSet = []; // 列表数组
  @ViewChild('nzTable') nzTable; // 获取列表元素
  ngOnInit() {
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

}
