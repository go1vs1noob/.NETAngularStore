import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Identifiable } from '../interfaces/identifieable';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.sass']
})
export class ListGroupComponent {
  @Input() data: Identifiable[] = [{ id: '0', name: "All" }];
  @Output() chosenItemChanged = new EventEmitter<number>();
  currentChosenItemId = 0;
  onListGroupItemClick(index: number) {
    this.currentChosenItemId = index;
    this.chosenItemChanged.emit(index);
  }

}
