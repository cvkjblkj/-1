import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'statistics-info',
  templateUrl: 'statistics-info.component.html',
  styleUrls: ['statistics-info.component.scss']
})

export class StatisticsInfoComponent implements OnInit {
  tab = true;
  enterpriseState: any;
  applicationState: any;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.enterpriseState = this.router.url.indexOf('enterprise-info');
    this.applicationState = this.router.url.indexOf('application-info');

  }
  enterpriseInfo() {
    this.enterpriseState = 1;
    this.applicationState = -1;
    const urls = this.router.url.slice(0, this.router.url.indexOf('statistics-info')) + 'statistics-info/enterprise-info';
    this.router.navigate([urls]);
  }
  applicationInfo() {
    this.enterpriseState = -1;
    this.applicationState = 1;
    const urls = this.router.url.slice(0, this.router.url.indexOf('statistics-info')) + 'statistics-info/application-info';
    this.router.navigate([urls]);
  }
}
