import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'step',
  templateUrl: 'step.component.html',
  styleUrls: ['./step.component.scss']
})

export class StepComponent implements OnInit {
  current = 0;
  firstContent = true;
  secondContent: boolean;
  thirdContent: boolean;
  fourContent: boolean;
  // 步骤一
  oneIsActive = true;
  TwoisActive = true;
  // 步骤二
  threeIsActive: boolean;
  fourIsActive: boolean;
  fiveIsActive: boolean;
  sixIsActive: boolean;
  /**步骤三 */
  sevenIsActive: boolean;
  eightIsActive: boolean;
  nineIsActive: boolean;
  tenIsActive: boolean;
  /**步骤四 */
  elevenIsActive: boolean;
  twelveIsActive: boolean;
  thirteenIsActive: boolean;
  pre() {
    this.current -= 1;
    this.changeContent();
  }

  next() {
    this.current += 1;
    this.changeContent();
  }

  done() {
    // this._message.success('done');
    console.log(11111)
  }

  changeContent() {
    switch (this.current) {
      case 0: {
        this.firstContent = true;
        this.secondContent = false;
        this.thirdContent = false;
        this.fourContent = false;
        this.oneIsActive = true;
        this.TwoisActive = true;
        this.threeIsActive = false;
        this.fourIsActive = false;
        this.fiveIsActive = false;
        this.sixIsActive = false;
        this.sevenIsActive = false;
        this.eightIsActive = false;
        this.nineIsActive = false;
        this.tenIsActive = false;
        this.elevenIsActive = false;
        this.twelveIsActive = false;
        this.thirteenIsActive = false;
        break;
      }
      case 1: {
        this.firstContent = false;
        this.secondContent = true;
        this.thirdContent = false;
        this.fourContent = false; 
        this.oneIsActive = false;
        this.TwoisActive = false;
        this.threeIsActive = true;
        this.fourIsActive = true;
        this.fiveIsActive = true;
        this.sixIsActive = true;
         this.sevenIsActive = false;
        this.eightIsActive = false;
        this.nineIsActive = false;
        this.tenIsActive = false;
        this.elevenIsActive = false;
        this.twelveIsActive = false;
        this.thirteenIsActive = false;
        break;
      }
      case 2: {
        this.firstContent = false;
        this.secondContent = false;
        this.thirdContent = true;
        this.fourContent = false;
        this.oneIsActive = false;
        this.TwoisActive = false;
        this.threeIsActive = false;
        this.fourIsActive = false;
        this.fiveIsActive = false;
        this.sixIsActive = false;
         this.sevenIsActive = true;
        this.eightIsActive = true;
        this.nineIsActive = true;
        this.tenIsActive = true;
        this.elevenIsActive = false;
        this.twelveIsActive = false;
        this.thirteenIsActive = false;
        break;
      }
      case 3: {
        this.firstContent = false;
        this.secondContent = false;
        this.thirdContent = false;
        this.fourContent = true;
         this.oneIsActive = false;
        this.TwoisActive = false;
        this.threeIsActive = false;
        this.fourIsActive = false;
        this.fiveIsActive = false;
        this.sixIsActive = false;
         this.sevenIsActive = false;
        this.eightIsActive = false;
        this.nineIsActive = false;
        this.tenIsActive = false;
        this.elevenIsActive = true;
        this.twelveIsActive = true;
        this.thirteenIsActive = true;
        break;
      }
      default: {
        this.firstContent = false;
      }
    }
  }

  ngOnInit() { }
}
