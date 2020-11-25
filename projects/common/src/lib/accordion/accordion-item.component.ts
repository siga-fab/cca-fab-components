import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'com-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class AccordionItemComponent implements OnInit {
  /**
   * @internal
   */
  _isOpen = false;

  @Input() headerTitle: string;

  constructor() {}

  ngOnInit(): void {}

  /**
   * @internal
   */
  toggle() {
    this._isOpen = !this._isOpen;
  }
}
