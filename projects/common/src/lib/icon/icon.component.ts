import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'com-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() size?: number;
  @Input() color?: string;

  constructor() {}

  ngOnInit(): void {}
}
