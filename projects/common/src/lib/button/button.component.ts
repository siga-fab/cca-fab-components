import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cca-common-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type: string;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.buttonClick.emit();
  }
}
