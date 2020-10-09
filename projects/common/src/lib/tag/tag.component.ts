import { Component, OnInit, Optional, Attribute, Input } from '@angular/core';

@Component({
  selector: 'com-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() selected?: boolean;

  constructor(
    @Optional() @Attribute('clickable') public clickable,
    @Optional() @Attribute('primary') public primary,
    @Optional() @Attribute('secondary') public secondary
  ) {}

  ngOnInit(): void {}
}
