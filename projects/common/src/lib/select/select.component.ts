import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  Input,
  AfterViewChecked,
  Output,
  EventEmitter,
  Self,
  Optional,
  OnInit,
  HostListener,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgFormsChangedFn, NgFormsTouchedFn } from '../../types/ngForms';
import { SelectOption } from '../../types/select';

@Component({
  selector: 'com-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
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
export class SelectComponent implements AfterViewChecked, OnInit {
  isOpen = false;

  forcedFocus = false;
  selectElement: HTMLElement;
  optionsParentElement: HTMLUListElement;
  inputElement: HTMLInputElement;

  value = '';
  selectedValue: any;
  selectedIndex = 0;

  isSelectionCloseCall = false;
  isCloseSelectioncall = false;

  @Input() options: Array<string | SelectOption> = [];
  @Input() label: string;
  @Input() placeholder = '';
  @Input() invalid = false;
  @Input() disabled = false;
  @Input() initialValue: any;

  @Output() changed = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  @Output() blurred = new EventEmitter();
  @Output() focused = new EventEmitter();

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
    @Self() @Optional() private ngControl: NgControl,
    public el: ElementRef
  ) {
    this.selectElement = this.el.nativeElement;

    this.selectElement.tabIndex = 0;

    /* istanbul ignore next */
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.handleInitialValue(this.initialValue);
  }

  /* istanbul ignore next */
  ngAfterViewChecked(): void {
    if (this.isOpen) {
      this.optionsParentElement = this.selectElement.querySelector('ul');
    } else {
      this.optionsParentElement = null;
    }
  }

  /* istanbul ignore next */
  writeValue(value: any) {
    this.handleInitialValue(value);
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

  handleInitialValue(value: any) {
    if (!this.options) {
      return;
    }

    const optionIndex = this.options.findIndex(
      (option) => value === (typeof option === 'object' ? option.value : option)
    );

    this.selectedIndex = optionIndex !== -1 ? optionIndex + 1 : 0;

    if (optionIndex !== -1) {
      const option = this.options[optionIndex];
      this.selectedIndex = optionIndex + 1;
      this.value =
        typeof option === 'object' ? String(option.name) : String(option);
      this.selectedValue = typeof option === 'object' ? option.value : option;
    } else {
      this.selectedIndex = 0;
      this.value = '';
      this.selectedValue = null;
    }
  }

  getInputElement(el: HTMLInputElement) {
    this.inputElement = el;

    this.inputElement.addEventListener('focus', this.open.bind(this));
    this.inputElement.addEventListener('blur', this.close.bind(this));
  }

  onImmediateChange(value: string) {
    const childElement: (index: number) => HTMLLIElement = (index) =>
      this.optionsParentElement.children[index] as HTMLLIElement;

    if (!value.length) {
      this.selectedIndex = 0;
      return;
    }

    const selection = this.options.find((option) => {
      const optionValue = typeof option === 'string' ? option : option.name;

      if (optionValue.toLowerCase().includes(value.toLowerCase())) {
        return optionValue;
      }

      return false;
    });

    if (!selection) {
      return;
    }
    this.value = value;
    this.selectedIndex = this.options.indexOf(selection) + 1;

    const child = childElement(this.selectedIndex);

    child.parentElement.parentElement.scroll({
      top: child.offsetTop - child.parentElement.parentElement.offsetTop,
    });
  }

  open() {
    if (this.disabled) {
      this.inputElement.blur();
      return;
    }

    this.isOpen = true;
    this.forcedFocus = true;
    this.opened.emit();

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
    this.isOpen = false;
    this.forcedFocus = false;
    this.closed.emit();

    if (!this.isSelectionCloseCall) {
      this.isCloseSelectioncall = true;
      this.selectedItem(this.selectedIndex);
    } else {
      this.isSelectionCloseCall = false;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const { key } = event;

    const childElement: (index: number) => HTMLLIElement = (index) =>
      this.optionsParentElement.children[index] as HTMLLIElement;

    if (!this.isOpen) {
      return;
    }

    event.stopPropagation();

    if (key === 'ArrowUp') {
      event.preventDefault();
      if (!this.selectedIndex) {
        return;
      }

      const child = childElement(--this.selectedIndex);

      child.parentElement.parentElement.scroll({
        top: child.offsetTop - child.parentElement.parentElement.offsetTop,
      });

      if (this.selectedIndex > 0) {
        this.value =
          typeof this.options[this.selectedIndex - 1] === 'string'
            ? (this.options[this.selectedIndex - 1] as string)
            : ((this.options[this.selectedIndex - 1] as SelectOption)
                .name as string);
      } else {
        this.value = '';
      }

      return;
    }

    if (key === 'ArrowDown') {
      event.preventDefault();
      if (this.selectedIndex === this.options.length) {
        return;
      }

      const child = childElement(++this.selectedIndex);

      child.parentElement.parentElement.scroll({
        top: child.offsetTop - child.parentElement.parentElement.offsetTop,
      });

      if (this.selectedIndex > 0) {
        this.value =
          typeof this.options[this.selectedIndex - 1] === 'string'
            ? (this.options[this.selectedIndex - 1] as string)
            : ((this.options[this.selectedIndex - 1] as SelectOption)
                .name as string);
      } else {
        this.value = '';
      }

      return;
    }

    if (key === 'Enter' || key === 'Escape') {
      this.isCloseSelectioncall = false;
      childElement(this.selectedIndex).click();
      return;
    }
  }

  selectedItem(index: number) {
    const selection = this.options[index - 1];

    this.selectedIndex = index;

    if (typeof selection === 'string') {
      this.value = selection;
      this.selectedValue = selection;
      this.changed.emit(this.selectedValue);
      this.onChange(this.selectedValue);
      this.onTouched();
    } else {
      this.value = selection ? String(selection.name) : '';
      this.selectedValue = selection ? selection.value : null;
      this.changed.emit(this.selectedValue);
      this.onChange(this.selectedValue);
      this.onTouched();
    }

    this.isSelectionCloseCall = true;

    if (!this.isCloseSelectioncall && this.inputElement) {
      this.isCloseSelectioncall = false;
      this.inputElement.blur();
    } else {
      this.isCloseSelectioncall = false;
    }
  }
}
