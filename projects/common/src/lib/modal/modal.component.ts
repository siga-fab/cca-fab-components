import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'com-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalInOut', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(.5)',
        }),
        animate(
          '.1s ease-in-out',
          style({
            opacity: 1,
            transform: 'scale(1)',
          })
        ),
      ]),

      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
        animate(
          '.12s ease-out',
          style({
            opacity: 0,
            transform: 'scale(.5)',
          })
        ),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '.18s ease-out',
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
          '.18s ease-out',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class ModalComponent {
  @Output() closed = new EventEmitter();
  @Output() confirm = new EventEmitter();

  isModalOpen = false;

  @Input() header = '';
  @Input() actionText = 'OK';

  /* istanbul ignore next */
  @HostBinding('@fadeInOut') private always = true;

  @HostListener('@fadeInOut.done', ['$event']) doneFadeInOutHandler(
    event: any
  ): void {
    if (event.fromState === 'void') {
      this.isModalOpen = true;
    }
  }

  @HostListener('click', ['$event']) outsideModalClick({ target }: MouseEvent) {
    if (target === this.el.nativeElement) {
      this.isModalOpen = false;
    }
  }

  constructor(public el: ElementRef) {}

  onClose() {
    this.isModalOpen = false;
  }

  modalAnimationDone(event: any) {
    if (event.fromState !== 'void') {
      this.closed.emit();
    }
  }

  onAction() {
    this.confirm.emit();
  }
}
