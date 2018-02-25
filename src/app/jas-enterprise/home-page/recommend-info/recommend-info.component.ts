import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonService } from './../../../core/services/conmmon.service';
@Component({
  selector: 'recommend-info',
  templateUrl: './recommend-info.component.html',
  styleUrls: ['./recommend-info.component.scss']
})
export class RecommendInfoComponent implements OnInit {

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public commonService: CommonService
  ) { }

  ngOnInit() {
  }
  /**
   * 申请
   */
  public application(e) {
    this.commonService.stopBubble(e);

    this.router.navigate(['/personal-center/my-application']);
  };
  /**
   * 推荐产品
   * @param e 
   */
  public clickBox(e) {
    this.commonService.stopBubble(e);
    this.router.navigate(['/enp-manage/user-audit']);
  }
}
