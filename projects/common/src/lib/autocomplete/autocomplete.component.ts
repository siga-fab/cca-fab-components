import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  Input,
  AfterViewChecked,
  Output,
  Optional,
  Self,
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

  private scrollBehavior: ScrollIntoViewOptions = {
    block: 'center',
  };

  @Input() options: Array<string | SelectOption> = [];
  @Input() label: string;
  @Input() placeholder = '';
  @Input() invalid = false;
  @Input() disabled = false;

  @Output() changed = new EventEmitter();
  @Output() confirmed = new EventEmitter();

  onChange: NgFormsChangedFn = (value: any): void => {};
  onTouched: NgFormsTouchedFn = (): void => {};

  constructor(
    @Optional() @Attribute('highlightFirst') public highlightFirst,
    @Self() @Optional() private ngControl: NgControl,
    public el: ElementRef
  ) {
    this.autocompleteElement = this.el.nativeElement;

    this.autocompleteElement.tabIndex = 0;

    this.autocompleteElement.addEventListener('focus', this.open.bind(this));
    this.autocompleteElement.addEventListener('blur', this.close.bind(this));
    this.autocompleteElement.addEventListener(
      'keydown',
      this.onKeyDown.bind(this)
    );

    this.highlightFirst = highlightFirst !== null;

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

    if (this.highlightFirst) {
      this.selectedIndex = 0;
    }
    /* istanbul ignore next */
    setTimeout(() => {
      if (this.optionsParentElement && this.selectedIndex) {
        const child = this.optionsParentElement.children[
          this.selectedIndex
        ] as HTMLLIElement;

        child.scrollIntoView();
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
  }

  onImmediateChange(value: string) {
    if (this.highlightFirst) {
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
      childElement(this.selectedIndex).scrollIntoView(this.scrollBehavior);
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

    if (!this.isOpen) {
      return;
    }

    if (key === 'ArrowUp') {
      if (this.selectedIndex === null || this.selectedIndex === 0) {
        this.selectedIndex = this.options.length;
      }

      if (!this.selectedIndex || !this.optionsParentElement) {
        return;
      }

      childElement(--this.selectedIndex).scrollIntoView(this.scrollBehavior);
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

      childElement(++this.selectedIndex).scrollIntoView(this.scrollBehavior);
      return;
    }

    if (key === 'Enter') {
      if (!this.optionsParentElement) {
      } else {
        childElement(this.selectedIndex).click();
      }
      return;
    }

    if (key === 'Escape') {
      this.inputElement.blur();
      return;
    }
  }

  selectedItem(index: number) {
    const selection = this.options[index];

    if (this.highlightFirst) {
      this.selectedIndex = 0;
    }

    if (typeof selection === 'string') {
      this.value = selection;
      this.changed.emit(this.value);
      this.confirmed.emit(this.value);
      this.inputElement.blur();
      return;
    }

    this.value = String(selection.name);
    this.changed.emit(this.value);
    this.confirmed.emit(selection.value);
    this.inputElement.blur();
  }
}
