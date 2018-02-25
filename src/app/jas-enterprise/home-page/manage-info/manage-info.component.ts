import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonService } from './../../../core/services/conmmon.service';
@Component({
  selector: 'manage-info',
  templateUrl: './manage-info.component.html',
  styleUrls: ['./manage-info.component.scss']
})
export class ManageInfoComponent implements OnInit {

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public commonService: CommonService
  ) { }

  ngOnInit() {
  }
  /**
   * 进入
   */
  public enter(e) {
  
    this.commonService.stopBubble(e);
    this.router.navigate(['/personal-center/myEnterprise-info/owned-enterprise']);
  };
  /**
 * 管理
 */
  public manage(e) {
    this.commonService.stopBubble(e);
    this.router.navigate(['/enp-manage/user-audit']);
  };
  /**
   *产品服务 
   */
  public clickBox(e) {
    this.commonService.stopBubble(e);
    this.router.navigate(['/personal-center/my-application']);
  }
}
