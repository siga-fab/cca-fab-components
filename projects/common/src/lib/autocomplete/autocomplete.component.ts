import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  OnInit,
  ElementRef,
  Input,
  ContentChild,
  ViewChild,
  AfterViewChecked,
  AfterContentChecked,
} from '@angular/core';
import { SelectOption } from '../../types/select';

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
export class AutocompleteComponent implements OnInit, AfterViewChecked {
  isOpen = false;
  inputElement: HTMLInputElement;
  selectElement: HTMLElement;
  forcedFocus = false;
  value = '';

  selectedIndex: number;
  optionsParentElement: HTMLUListElement;

  @Input() options: string[] | SelectOption[] = [];

  constructor(public el: ElementRef) {
    this.selectElement = this.el.nativeElement;
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.isOpen) {
      this.optionsParentElement = this.el.nativeElement.querySelector('ul');
    } else {
      this.optionsParentElement = null;
    }
  }

  open(event?: FocusEvent) {
    this.isOpen = true;
    this.inputElement.focus();

    setTimeout(() => {
      if (this.optionsParentElement && this.selectedIndex) {
        const child = this.optionsParentElement.children[
          this.selectedIndex
        ] as HTMLLIElement;

        child.scrollIntoView();
      }
    });
  }

  close(event?: FocusEvent) {
    if (event) {
      const { relatedTarget: FOCUSED_ELEMENT } = event;

      if (typeof this.selectedIndex === 'undefined') {
        this.inputElement.value = '';
      }

      if (this.selectElement.contains(FOCUSED_ELEMENT as HTMLElement)) {
        this.forcedFocus = true;
        return;
      }
    }

    this.inputElement.blur();

    this.isOpen = false;
    this.forcedFocus = false;
  }

  getInputRef(el: HTMLInputElement) {
    this.inputElement = el;
  }

  onArrowClick() {
    this.open();
  }

  onCloseClick() {
    this.close();
  }

  onImmediateChange(value: string) {
    this.selectedIndex = null;
    console.log(value);
  }

  selectedItem(index: number) {
    const selection = this.options[index];

    this.selectedIndex = index;

    if (typeof selection === 'string') {
      this.value = selection;
      this.close();

      return;
    }

    this.value = String(selection.value);
    this.close();
  }
}
