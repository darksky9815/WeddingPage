import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-homePage',
  templateUrl: './homePage.page.html',
  styleUrls: ['./homePage.page.scss'],
})
export class HomePage implements OnInit {
  //private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
  }
}
