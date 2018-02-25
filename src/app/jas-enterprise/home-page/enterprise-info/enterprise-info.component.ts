import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'enterprise-info',
  templateUrl: './enterprise-info.component.html',
  styleUrls: ['./enterprise-info.component.scss']
})
export class EnterpriseInfoComponent implements OnInit {

  constructor(
    private router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  /**
   *认证
   */
  public immediately() {
    this.router.navigate(['/enp-manage/user-audit']);
  }
  /**
   * 审核
   */
  public examine() {
    this.router.navigate(['/enp-manage/user-audit']);
  }
}
