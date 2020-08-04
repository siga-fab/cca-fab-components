import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sc-common-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() description: string;
  @Output() click: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onclick() {
    this.click.emit();
  }
}