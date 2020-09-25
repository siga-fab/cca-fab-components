import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ElementRef } from '@angular/core';

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
export class SelectComponent implements OnInit {
  isOpen = false;
  inputElement: HTMLInputElement;
  selectElement: HTMLElement;
  forcedFocus = false;

  constructor(public el: ElementRef) {
    this.selectElement = this.el.nativeElement;
  }

  ngOnInit(): void {}

  open(event?: FocusEvent) {
    this.isOpen = true;
    this.inputElement.focus();
  }

  close(event?: FocusEvent) {
    if (event) {
      const { relatedTarget: FOCUSED_ELEMENT } = event;

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

  teste() {
    console.log('saiu');
  }
}
