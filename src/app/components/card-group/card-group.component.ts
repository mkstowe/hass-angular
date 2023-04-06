import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CardGroupComponent {
  @Input() title: string;

}
