import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  searchString = "";
  @Output() searchStringChanged = new EventEmitter<string>();;
  onSearchStringChanged($event: any) {
    this.searchString = $event.target.value;
    this.searchStringChanged.emit(this.searchString);
  }
}
