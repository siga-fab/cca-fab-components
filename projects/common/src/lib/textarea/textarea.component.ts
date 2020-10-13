import { trigger, transition, animate, style } from '@angular/animations';
import { AfterViewInit, Self, ElementRef, HostBinding } from '@angular/core';
import {
  Component,
  Input,
  OnInit,
  Optional,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'com-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
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
export class TextareaComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  DEFAULT_MAX_LENGTH = 524288;

  @Input() value = '';
  @HostBinding('class.disabled') @Input() disabled = false;
  @Input() focus = false;
  @Input() placeholder = '';
  @Input() label;
  @HostBinding('class.hasOptionalText') @Input() helper = '';
  @Input() maxlength;
  @Input() invalid = false;

  @Output() confirm = new EventEmitter();
  @Output() ref = new EventEmitter();

  @ViewChild('textarea') textarea: ElementRef;

  qntChar: number;

  constructor(@Self() @Optional() private ngControl: NgControl) {
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
    this.ref.emit(this.textarea.nativeElement);
  }

  exibeQntChar(value: string) {
    this.qntChar = value.length;

    this.textarea.nativeElement.style.height = 'auto';
    this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
  }

  isFocused(value: boolean) {
    this.focus = value;

    if (!value) {
      this.textarea.nativeElement.placeholder = '';
      this.confirm.emit(this.value);
    } else {
      if (this.placeholder) {
        this.textarea.nativeElement.placeholder = this.placeholder;
      }
    }
  }

  updateValue(event: Event) {
    const el = event.target as HTMLInputElement;
    this.value = el.value;
  }
}
