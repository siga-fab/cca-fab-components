import { trigger, transition, animate, style } from '@angular/animations';
import { AfterViewInit, Self } from '@angular/core';
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
import { NgControl } from '@angular/forms';

@Component({
  selector: 'cca-common-input',
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
export class InputComponent implements OnInit, AfterViewInit {
  DEFAULT_MAX_LENGTH = 524288;

  @Input() value = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() step = 1;
  @Input() min: number;
  @Input() max: number;
  @Input() focus = false;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() maxlength;

  @Output() confirm = new EventEmitter();
  @Output() ref = new EventEmitter();

  @ViewChild('input') input;

  numberInterval: any;
  numberIntervalCounter = 1;

  constructor(
    @Optional() @Attribute('textCenter') public textCenter: any,
    @Optional() @Attribute('slim') public slim: any,
    @Self() @Optional() private ngControl: NgControl
  ) {
    this.textCenter = textCenter !== null;
    this.slim = slim !== null;

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
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  /* istanbul ignore next */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  /* istanbul ignore next */
  onChange(value: any) {}
  /* istanbul ignore next */
  onTouched() {}
  /* istanbul ignore next */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ref.emit(this.input.nativeElement);
  }

  isFocused(value: boolean) {
    this.focus = value;

    if (!value) {
      if (this.type === 'number') {
        this.rangedValue(this.input.nativeElement);
      }
      this.input.nativeElement.placeholder = '';
      this.confirm.emit(this.value);
      if (this.numberInterval) {
        this.clearNumberInterval();
      }
    } else {
      if (this.placeholder) {
        this.input.nativeElement.placeholder = this.placeholder;
      }
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
  }

  rangedValue(el: HTMLInputElement) {
    let value = parseInt(el.value, 10);

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
      let value = parseInt(this.value, 10) || 0;

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
