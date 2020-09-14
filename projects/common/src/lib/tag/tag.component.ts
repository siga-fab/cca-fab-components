import { Component, OnInit, Optional, Attribute, Input } from '@angular/core';

@Component({
  selector: 'cca-common-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() selected?: boolean;

  constructor(@Optional() @Attribute('clickable') public clickable) {}

  ngOnInit(): void {}
}
