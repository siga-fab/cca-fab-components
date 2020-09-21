import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cca-common-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  static checkboxCount = 0;

  @Input() name = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() id = `checkbox-${CheckboxComponent.checkboxCount++}__input`;

  @Input() value: string;

  @Output() changed = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onChange(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.changed.emit(this.checked);
    }
  }
}
