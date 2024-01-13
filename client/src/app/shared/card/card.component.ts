import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardInfo } from 'src/app/shop/models/card-info';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() cardInfo: CardInfo | null = null;
  @Input() buttonRightText: string = "";
  @Input() buttonLeftText: string = "";
  
  @Output() onLeftBtnClick: EventEmitter<any> = new EventEmitter();
  @Output() onRightBtnClick: EventEmitter<any> = new EventEmitter();

  leftBtnClicked() {
    this.onLeftBtnClick.emit(this.cardInfo?.item);
  }
  rightBtnClicked() {
    this.onRightBtnClick.emit(this.cardInfo?.item);
  }

}
