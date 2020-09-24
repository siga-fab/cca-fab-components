import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
  Attribute,
} from '@angular/core';

// TODO: Add indeterminate state
@Component({
  selector: 'cca-common-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  static checkboxCount = 0;

  /**
   * Set to `true` if the input checkbox is selected (or checked).
   */
  protected _checked = false;

  @Input() name = '';
  @Input() disabled = false;
  @Input() id = `checkbox-${CheckboxComponent.checkboxCount++}__input`;
  @Input() ariaLabel?: string;
  @Input() value?: string;

  @Input()
  set checked(checked: boolean) {
    this._checked = checked;
  }

  /**
   * Returns value `true` if state is selected for the checkbox.
   */
  get checked() {
    return this._checked;
  }

  @Output() changed = new EventEmitter<boolean>();

  constructor(
    @Optional() @Attribute('switch') public isSwitch: any,
    @Self() @Optional() private ngControl: NgControl
  ) {
    this.isSwitch = isSwitch !== null;
    /* istanbul ignore next */
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  onClick(): void {
    if (!this.disabled) {
      this.checked = !this.checked;

      this.propagateChange(this.checked);
      this.changed.emit(this.checked);
    }
  }

  onChange(event: Event) {
    event.stopPropagation();
  }

  /**
   * Writes a value from `ngModel` to the component.
   *
   * In this case the value is the `checked` property.
   *
   * @param value boolean, corresponds to the `checked` property.
   *
   */
  /* istanbul ignore next */
  writeValue(value: any) {
    this.checked = !!value;
  }

  /* istanbul ignore next */
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  /* istanbul ignore next */
  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  propagateChange = (_: any) => {};

  onTouched: () => any = () => {};
}
