import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cca-common-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  static checkboxCount = 0;

  @Input() value: string;
  @Input() name: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() id = `checkbox-${CheckboxComponent.checkboxCount}__input`;

  @Output() toggle = new EventEmitter<boolean>();

  constructor() {
    CheckboxComponent.checkboxCount++;
  }

  ngOnInit(): void {}

  onClick(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.toggle.emit(this.checked);
    }
  }
}
