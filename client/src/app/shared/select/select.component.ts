import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Identifiable } from '../interfaces/identifieable';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent {
  @Input() optionList: Identifiable[] = [];
  @Output() chosenOptionChanged = new EventEmitter<number>();
  currentChosenOptionId = 0;
  onSelectionChange($event: any) {
    let selectedIndex: number = $event.target.selectedIndex;
    this.currentChosenOptionId = selectedIndex;
    this.chosenOptionChanged.emit(this.currentChosenOptionId);
  }
}
