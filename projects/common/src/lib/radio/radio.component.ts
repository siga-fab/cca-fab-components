import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cca-common-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  static radioCount = 0;

  @Input() name = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() id = `radio-${RadioComponent.radioCount++}__input`;
  @Input() ariaLabel = '';

  /**
   * Sets the HTML required attribute
   */
  @Input() required = false;

  @Input() value: string;

  @Output() changed = new EventEmitter<boolean>();

  /**
   * Handler provided by the radiou-group to bubble events up
   */
  radioChangeHandler = (e: string) => {};

  constructor() {}

  ngOnInit(): void {}

  onChange(e): void {
    if (!this.disabled) {
      this.checked = (e.target as HTMLInputElement).checked;
      this.changed.emit(this.checked);
      if (this.checked) {
        this.radioChangeHandler(this.value);
      }
    }
  }

  registerRadioChangeHandler(fn: (e: string) => void) {
    this.radioChangeHandler = fn;
  }
}
