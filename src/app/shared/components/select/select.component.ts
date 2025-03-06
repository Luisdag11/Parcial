import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../services/http/http.service';

@Component({
  standalone: false,
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent  implements OnInit {

  categories: string[] = [];
  selectedCategory: string = '';

  @Output() categorySelected = new EventEmitter<string>();

  constructor(private apiStore: HttpService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.apiStore.getCategories().subscribe(
      (data) => {
        this.categories = data;
      });
  }

  selectCategory(category: string){
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }

}
