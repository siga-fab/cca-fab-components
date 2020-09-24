import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  Component,
  OnInit,
  ContentChildren,
  forwardRef,
  QueryList,
  Input,
  AfterContentInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Optional,
  Attribute,
  Self,
} from '@angular/core';

import { RadioComponent } from './radio.component';

@Component({
  selector: 'cca-common-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent
  implements OnInit, AfterContentInit, AfterViewInit, ControlValueAccessor {
  static radioGroupCount = 0;

  /**
   * Reflects whether or not the input is disabled and cannot be selected.
   */
  protected _disabled = false;
  /**
   * The value of the selected option within the `RadioGroup`.
   */
  protected _value: any = null;
  /**
   * The `Radio` within the `RadioGroup` that is selected.
   */
  protected _selected: RadioComponent = null;
  /**
   * The name attribute associated with the `RadioGroup`.
   */
  protected _name = `radio-group-${RadioGroupComponent.radioGroupCount++}`;

  /* istanbul ignore next */
  @Input()
  set selected(selected: RadioComponent | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this.checkSelectedRadio();
  }

  /**
   * Returns the `Radio` that is selected within the `RadioGroup`.
   */
  /* istanbul ignore next */
  get selected() {
    return this._selected;
  }

  /**
   * Sets the value/state of the selected `Radio` within the `RadioGroup` to the passed in value.
   */
  /* istanbul ignore next */
  @Input()
  set value(newValue: any) {
    if (this._value !== newValue) {
      this._value = newValue;

      this.updateSelectedRadioFromValue();
      this.checkSelectedRadio();
    }
  }

  /**
   * Returns the value/state of the selected `Radio` within the `RadioGroup`.
   */
  /* istanbul ignore next */
  get value() {
    return this._value;
  }

  /* istanbul ignore next */
  @Input()
  set name(name: string) {
    this._name = name;
    this.updateRadios();
  }

  /**
   * Returns the associated name of the `RadioGroup`.
   */
  /* istanbul ignore next */
  get name() {
    return this._name;
  }

  @Output() changed = new EventEmitter<string>();

  @ContentChildren(forwardRef(() => RadioComponent)) radios: QueryList<
    RadioComponent
  >;

  constructor(
    @Optional() @Attribute('horizontal') public horizontal,
    @Self() @Optional() private ngControl: NgControl
  ) {
    /* istanbul ignore next */
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  /* istanbul ignore next */
  ngAfterContentInit(): void {
    this.radios.changes.subscribe(() => {
      this.updateRadios();
      this.updateRadioChangeHandlers();
    });

    this.updateRadioChangeHandlers();
  }

  ngAfterViewInit(): void {
    this.updateRadios();
  }

  checkSelectedRadio() {
    if (this.selected && !this._selected.checked) {
      this.selected.checked = true;
    }
  }

  /**
   * Synchronizes radio properties.
   */
  /* istanbul ignore next */
  updateRadios() {
    if (this.radios) {
      setTimeout(() => {
        this.radios.forEach((radio) => (radio.name = this.name));
      });
    }
  }

  updateSelectedRadioFromValue() {
    const alreadySelected =
      this._selected != null && this._selected.value === this._value;
    if (this.radios && !alreadySelected) {
      this._selected = null;
      this.radios.forEach((radio) => {
        if (radio.checked || radio.value === this._value) {
          this._selected = radio;
        }
      });
    }
  }

  /* istanbul ignore next */
  updateRadioChangeHandlers(): void {
    if (this.radios) {
      this.radios.forEach((radio) => {
        radio.registerRadioChangeHandler((value: string) => {
          this.changed.emit(value);
          this.propagateChange(value);
          this.onTouched();
        });
      });
    }
  }

  /**
   * Updates the value of the `RadioGroup` using the provided parameter.
   */
  /* istanbul ignore next */
  writeValue(value: any) {
    this.value = value;
    setTimeout(() => {
      this.updateSelectedRadioFromValue();
      this.checkSelectedRadio();
    });
  }

  /**
   * Used to set method to propagate changes back to the form.
   */
  /* istanbul ignore next */
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  /**
   * Registers a callback to be triggered when the control has been touched.
   * @param fn Callback to be triggered when the checkbox is touched.
   */
  /* istanbul ignore next */
  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Method set in registerOnChange to propagate changes back to the form.
   */
  propagateChange = (_: any) => {};

  /**
   * Needed to properly implement ControlValueAccessor.
   */
  onTouched: () => any = () => {};
}
