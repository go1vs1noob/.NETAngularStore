import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() buttonLeftText = "";
  @Input() buttonRightText = "";
  @Input() cardText = "";
  @Input() cardTitle = "";
  @Input() cardImageSrc = "";

}
