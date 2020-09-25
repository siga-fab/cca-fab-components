import { Component, OnInit, Input, Optional, Attribute } from '@angular/core';

@Component({
  selector: 'com-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() size?: number;
  @Input() color?: string;

  constructor(@Optional() @Attribute('outlined') public outlined) {
    this.outlined = outlined === '';
  }

  ngOnInit(): void {}
}
