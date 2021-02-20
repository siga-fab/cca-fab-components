import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  Input,
  AfterViewChecked,
  Output,
  Optional,
  Self,
  HostListener,
} from '@angular/core';
import { SelectOption } from '../../types/select';
import { EventEmitter, Attribute } from '@angular/core';
import { NgFormsChangedFn, NgFormsTouchedFn } from '../../types/ngForms';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'com-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '.15s ease-in-out',
          style({ opacity: 1, transform: 'translateY(0px)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0px)' }),
        animate(
          '.15s ease-in-out',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class AutocompleteComponent implements AfterViewChecked {
  isOpen = false;
  inputElement: HTMLInputElement;
  autocompleteElement: HTMLElement;
  value = '';

  selectedIndex: number = null;
  optionsParentElement: HTMLUListElement;

  @Input() options: Array<string | SelectOption> = [];
  @Input() label: string;
  @Input() placeholder = '';
  @Input() invalid = false;
  @Input() disabled = false;

  @Output() changed = new EventEmitter();
  @Output() confirmed = new EventEmitter();

  @Output() blurred = new EventEmitter();
  @Output() focused = new EventEmitter();

  @Output() ref = new EventEmitter();

  @Input() autoActiveFirstOption: boolean;
  @Input() enableConfirmOnInexistentValue: boolean;

  onChange: NgFormsChangedFn = (value: any): void => {};
  onTouched: NgFormsTouchedFn = (): void => {};

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.onKeyDown(event);
  }

  @HostListener('focus', ['$event'])
  onFocus(event) {
    this.open();
  }

  @HostListener('blur', ['$event'])
  onBlur(event) {
    this.close();
  }

  constructor(
    @Optional()
    @Self()
    @Optional()
    private ngControl: NgControl,
    public el: ElementRef
  ) {
    this.autocompleteElement = this.el.nativeElement;

    this.autocompleteElement.tabIndex = 0;

    this.autoActiveFirstOption = this.autoActiveFirstOption !== null;
    this.enableConfirmOnInexistentValue =
      this.enableConfirmOnInexistentValue !== null;

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
  registerOnChange(fn: NgFormsChangedFn): void {
    this.onChange = fn;
  }
  /* istanbul ignore next */
  registerOnTouched(fn: NgFormsTouchedFn): void {
    this.onTouched = fn;
  }
  /* istanbul ignore next */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /* istanbul ignore next */
  ngAfterViewChecked(): void {
    if (this.isOpen) {
      this.optionsParentElement = this.el.nativeElement.querySelector('ul');
    } else {
      this.optionsParentElement = null;
    }
  }

  open() {
    if (this.disabled) {
      this.autocompleteElement.blur();
      return;
    }

    this.isOpen = true;
    this.inputElement.focus();

    if (this.autoActiveFirstOption) {
      this.selectedIndex = 0;
    }
    /* istanbul ignore next */
    setTimeout(() => {
      if (this.optionsParentElement && this.selectedIndex) {
        const child = this.optionsParentElement.children[
          this.selectedIndex
        ] as HTMLLIElement;

        child.parentElement.parentElement.scroll({
          top: child.offsetTop - child.parentElement.parentElement.offsetTop,
        });
      }
    });
  }

  close() {
    this.selectedIndex = null;

    this.inputElement.blur();

    this.isOpen = false;
  }

  getInputRef(el: HTMLInputElement) {
    this.inputElement = el;
    this.ref.emit(el);
  }

  onImmediateChange(value: string) {
    if (this.autoActiveFirstOption) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex = null;
    }

    if (
      this.optionsParentElement &&
      this.options.length &&
      this.selectedIndex !== null
    ) {
      const childElement: (index: number) => HTMLLIElement = (index) =>
        this.optionsParentElement.children[index] as HTMLLIElement;

      const child = childElement(this.selectedIndex);

      child.parentElement.parentElement.scroll({
        top: child.offsetTop - child.parentElement.parentElement.offsetTop,
      });
    }

    this.value = value;
    this.changed.emit(value);
  }

  onKeyDown(event: KeyboardEvent) {
    const { key } = event;

    let childElement: (index: number) => HTMLLIElement;

    if (this.optionsParentElement) {
      childElement = (index) =>
        this.optionsParentElement.children[index] as HTMLLIElement;
    }

    if (!this.enableConfirmOnInexistentValue && !this.isOpen) {
      return;
    }

    if (key === 'ArrowUp') {
      if (this.selectedIndex === null || this.selectedIndex === 0) {
        this.selectedIndex = this.options.length;
      }

      if (!this.selectedIndex || !this.optionsParentElement) {
        return;
      }

      const child = childElement(--this.selectedIndex);

      child.parentElement.parentElement.scroll({
        top: child.offsetTop - child.parentElement.parentElement.offsetTop,
      });

      return;
    }

    if (key === 'ArrowDown') {
      if (!this.optionsParentElement) {
        return;
      }

      if (
        this.selectedIndex === null ||
        this.selectedIndex === this.options.length - 1
      ) {
        this.selectedIndex = -1;
      }

      const child = childElement(++this.selectedIndex);

      child.parentElement.parentElement.scroll({
        top: child.offsetTop - child.parentElement.parentElement.offsetTop,
      });

      return;
    }

    if (key === 'Enter') {
      if (!this.optionsParentElement && !this.enableConfirmOnInexistentValue) {
        return;
      }

      if (
        this.selectedIndex === null ||
        (!this.selectedIndex && !this.optionsParentElement)
      ) {
        if (
          this.enableConfirmOnInexistentValue &&
          this.value &&
          this.value.trim()
        ) {
          this.confirmed.emit(this.value);
        }

        return;
      }

      childElement(this.selectedIndex).click();
    }

    if (key === 'Escape') {
      this.inputElement.blur();
      return;
    }
  }

  selectedItem(index: number) {
    const selection = this.options[index];

    if (this.autoActiveFirstOption) {
      this.selectedIndex = 0;
    }

    if (typeof selection === 'string') {
      this.value = selection;
      this.changed.emit(this.value);
      this.confirmed.emit(this.value);
      this.onChange(selection);
      this.onTouched();
      this.inputElement.blur();
      return;
    }

    this.value = String(selection.name);
    this.changed.emit(this.value);
    this.confirmed.emit(selection);
    this.onChange(String(selection.value));
    this.onTouched();
    this.inputElement.blur();
  }
}
