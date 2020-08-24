import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'common-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.buttonClick.emit();
  }
}
