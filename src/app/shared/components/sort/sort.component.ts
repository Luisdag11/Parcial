import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SortComponent  implements OnInit {

  @Output() sortSelected = new EventEmitter<string>();

  selectedSort: string = 'price-asc'

  constructor() { }

  ngOnInit() {}

  selectSort(order: string) {
    this.selectedSort = order;
    this.sortSelected.emit(order);
  }

}
