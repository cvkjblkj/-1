import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public Property: boolean = false;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }



}
