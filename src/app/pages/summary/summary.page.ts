import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  purchase: any = null;

  constructor() { }

  ngOnInit() {
    this.purchase = JSON.parse(localStorage.getItem('lastPurchase') || 'null');
  }

}
