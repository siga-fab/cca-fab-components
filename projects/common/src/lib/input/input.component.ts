import { trigger, transition, animate, style } from '@angular/animations';
import { AfterViewInit, Self, ElementRef } from '@angular/core';
import {
  Attribute,
  Component,
  Input,
  OnInit,
  Optional,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';

import { NgFormsFn } from '../../types/ngForms';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'com-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '.1s ease-in-out',
          style({
            opacity: 1,
          })
        ),
      ]),

      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate(
          '.1s ease-in-out',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class InputComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  DEFAULT_MAX_LENGTH = 524288;
  @Input() value = '';
  @Input() type = 'text';
  @Input() step = 1;
  @Input() min: number;
  @Input() max: number;
  @Input() focus = false;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() maxlength;
  @Input() forcedFocus = false;

  @Output() confirm = new EventEmitter();
  @Output() immediate = new EventEmitter();
  @Output() ref = new EventEmitter();

  @Output() focused = new EventEmitter();
  @Output() blurred = new EventEmitter();

  @ViewChild('input') input;

  numberInterval: any;
  numberIntervalCounter = 1;

  onChange: NgFormsFn = (value: any): void => {};
  onTouched: NgFormsFn = (value: any): void => {};

  constructor(
    @Optional() @Attribute('textCenter') public textCenter: any,
    @Optional() @Attribute('slim') public slim: any,
    @Optional() @Attribute('integerOnly') public integerOnly: any,
    @Optional() @Attribute('arrowed') public arrowed: any,
    @Optional() @Attribute('disabled') public disabled: any,
    @Optional() @Attribute('immediate') public immediateEnabled: any,
    @Self() @Optional() private ngControl: NgControl
  ) {
    this.textCenter = textCenter !== null;
    this.slim = slim !== null;
    this.integerOnly = integerOnly !== null;
    this.arrowed = arrowed !== null;
    this.disabled = disabled !== null;
    this.immediateEnabled = immediateEnabled !== null;

    /* istanbul ignore next */
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  /* istanbul ignore next */
  writeValue(value: any) {
    this.value = value;
  }
  /* istanbul ignore next */
  registerOnChange(fn: NgFormsFn): void {
    this.onChange = fn;
  }
  /* istanbul ignore next */
  registerOnTouched(fn: NgFormsFn): void {
    this.onTouched = fn;
  }
  /* istanbul ignore next */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ref.emit(this.input.nativeElement);
  }

  isFocused(value: boolean, event: FocusEvent) {
    this.focus = value;

    if (!value) {
      if (this.type === 'number') {
        this.rangedValue(this.input.nativeElement);
      }

      this.confirm.emit(this.value);
      if (this.numberInterval) {
        this.clearNumberInterval();
      }

      this.blurred.emit(event);
    } else {
      this.focused.emit(event);
    }
  }

  clearNumberInterval() {
    clearInterval(this.numberInterval);
    this.numberInterval = null;
    this.numberIntervalCounter = 1;
  }

  onMouseUp() {
    this.clearNumberInterval();
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.type === 'number' && (event.key === '+' || event.key === 'e')) {
      return false;
    }

    if (event.key === 'Enter') {
      if (this.type === 'number') {
        this.rangedValue(this.input.nativeElement);
      }
      this.confirm.emit(this.value);
    }

    if (
      this.type === 'autocomplete' &&
      (event.key === 'ArrowUp' || event.key === 'ArrowDown')
    ) {
      event.preventDefault();
    }
  }

  onImmediateChange(value: string): void {
    this.immediate.emit(value);
  }

  rangedValue(el: HTMLInputElement) {
    let value = this.integerOnly
      ? parseInt(el.value, 10)
      : parseFloat(el.value);

    if (Number.isNaN(value)) {
      value = this.min || 0;
    }

    if (this.type === 'number') {
      if (this.max) {
        value = Math.min(this.max, value);
      }

      if (this.min) {
        value = Math.max(this.min, value);
      }

      this.value = el.value = String(value);
    }
  }

  updateValue(event: Event) {
    const el = event.target as HTMLInputElement;
    this.value = el.value;
  }

  updateNumberValue(event: Event, operation: 'add' | 'sub') {
    // Impede remoção do foco do input
    event.preventDefault();

    const step = operation === 'add' ? +this.step : -this.step;
    const numberUpdate = () => {
      let value =
        (this.integerOnly
          ? parseInt(this.value, 10)
          : parseFloat(this.value)) || 0;

      value += step;

      if (this.max) {
        value = Math.min(this.max, value);
      }

      if (this.min) {
        value = Math.max(this.min, value);
      }

      this.value = String(value);
    };

    numberUpdate();

    // Cria intervalo onde (depois de um delay de 500ms) atualiza o valor do input a cada 50ms
    this.numberInterval = setInterval(() => {
      if (this.numberIntervalCounter > 10) {
        // Garante o delay de 500ms (50 do intervalo, e 10 das iterações com contador menor que 10)
        numberUpdate();
      }
      ++this.numberIntervalCounter;
    }, 50);
  }
}
