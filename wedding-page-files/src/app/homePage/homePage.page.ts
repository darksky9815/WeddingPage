import { Component, inject, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-homePage',
  templateUrl: './homePage.page.html',
  styleUrls: ['./homePage.page.scss'],
})
export class HomePage implements OnInit {
  confirmationButton = new Date().toISOString().split('T')[0] < '2025-10-02';
 
  constructor() {}

  ngOnInit() {
  }
}
