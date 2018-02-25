import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  radioValue: any = {};

  _dataSet = [];
  constructor() {
  }
  @ViewChild("nzTable") nzTable;
  ngOnInit() {

    this.data.forEach(item => {
      this.expandDataCache[item.key] = this.convertTreeToList(item);
    });
    console.log(this.expandDataCache);
    console.log(this.nzTable);
    setTimeout(() => {
      this.nzTable.nzLoading = false;
    }, 1000)
    for (let i = 0; i < 56; i++) {
      // for (let i = 0; i < 0; i++) {
      this._dataSet.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        number: i + 1,
        colorName: "红色" + i + 10,
        oracle: "oracle----01928392981----" + i + 100,
      });
    }
  }

  _checked = true;

  _console(value) {
    console.log(value);
    console.log(this.radioValue);
  }



  data = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      ruleList: [{ name: "1" }, { name: "2" }, { name: "3" }],
      children: [{
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
        ruleList: [{ name: "4" }, { name: "5" }, { name: "6" }],
      }, {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        ruleList: [{ name: "11" }, { name: "22" }, { name: "33" }],
        children: [{
          key: 121,
          name: 'Jimmy Brown',
          age: 16,
          address: 'New York No. 3 Lake Park',
          ruleList: [{ name: "1111" }, { name: "2222" }, { name: "3333" }],
        }],
      }, {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park', ruleList: [{ name: "11-11" }, { name: "22-22" }, { name: "33-33" }],
        children: [{
          key: 131,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park',
          ruleList: [{ name: "11-1111" }, { name: "22-2222" }, { name: "33-3333" }],
          children: [{
            key: 1311,
            name: 'Jim Green jr.',
            age: 25,
            address: 'London No. 3 Lake Park',
            ruleList: [{ name: "11-1-341" }, { name: "22-2-342" }, { name: "33-3-343" }],
          }, {
            key: 1312,
            name: 'Jimmy Green sr.',
            age: 18,
            address: 'London No. 4 Lake Park',
            ruleList: [{ name: "11-1-34--1" }],
          }],
        }],
      }],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      ruleList: [],
    }
  ];
  expandDataCache = {};

  collapse(array, data, $event) {
    console.log(array);
    console.log(data);
    console.log($event);
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root) {
    const stack = [], array = [], hashMap = {};
    stack.push({ ...root, level: 0, expand: false });
    console.log("默认的stack----");
    console.log(stack);
    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node, hashMap, array) {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }



  PageIndexChange(e) {
    console.log("页码变化回调");
    console.log(e);
  }
  nzPageSizeChange(e) {
    console.log("数量变化回调");
    console.log(e);
  }
}
