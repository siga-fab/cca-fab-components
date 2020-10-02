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
export class SelectComponent implements AfterViewChecked {
  isOpen = false;

  forcedFocus = false;
  selectElement: HTMLElement;
  optionsParentElement: HTMLUListElement;

  value = '';
  selectedIndex = 0;

  private scrollBehavior: ScrollIntoViewOptions = {
    block: 'center',
  };

  @Input() options: Array<string | SelectOption> = [];
  @Input() label: string;
  @Input() placeholder = '';
  @Input() invalid = false;
  @Input() disabled = false;

  @Output() changed = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  onChange: NgFormsChangedFn = (value: any): void => {};
  onTouched: NgFormsTouchedFn = (): void => {};

  constructor(
    @Self() @Optional() private ngControl: NgControl,
    public el: ElementRef
  ) {
    this.selectElement = this.el.nativeElement;

    this.selectElement.tabIndex = 0;

    this.selectElement.addEventListener('focus', this.open.bind(this));
    this.selectElement.addEventListener('blur', this.close.bind(this));
    this.selectElement.addEventListener('keydown', this.onKeyDown.bind(this));

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
      this.optionsParentElement = this.selectElement.querySelector('ul');
    } else {
      this.optionsParentElement = null;
    }
  }

  open() {
    if (this.disabled) {
      this.selectElement.blur();
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

        child.scrollIntoView(this.scrollBehavior);
      }
    });
  }

  close() {
    this.isOpen = false;
    this.forcedFocus = false;
    this.closed.emit();
  }

  onKeyDown(event: KeyboardEvent) {
    const { key } = event;

    const childElement: (index: number) => HTMLLIElement = (index) =>
      this.optionsParentElement.children[index] as HTMLLIElement;

    if (!this.isOpen) {
      return;
    }

    if (key === 'ArrowUp') {
      if (!this.selectedIndex) {
        return;
      }

      childElement(--this.selectedIndex).scrollIntoView(this.scrollBehavior);
      return;
    }

    if (key === 'ArrowDown') {
      if (this.selectedIndex === this.options.length) {
        return;
      }

      childElement(++this.selectedIndex).scrollIntoView(this.scrollBehavior);
      return;
    }

    if (key === 'Enter' || key === ' ') {
      childElement(this.selectedIndex).click();
      return;
    }

    if (key === 'Escape') {
      this.selectElement.blur();
      return;
    }
  }

  selectedItem(index: number) {
    const selection = this.options[index - 1];

    this.selectedIndex = index;

    if (typeof selection === 'string') {
      this.value = selection;
      this.changed.emit(selection);
    } else {
      this.value = selection ? String(selection.name) : '';
      this.changed.emit(selection ? selection.value : null);
    }

    this.selectElement.blur();
  }
}
