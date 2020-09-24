import {
  Component,
  OnInit,
  Output,
  Optional,
  Attribute,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'com-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'void',
        style({
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      state(
        'open',
        style({
          opacity: 1,
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      transition('void => *', [animate('.25s')]),
      transition('open => closed', [animate('.25s')]),
      transition('closed => open', [animate('.25s')]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  @Output() closed = new EventEmitter<Event>();

  isOpen = true;

  constructor(
    @Optional() @Attribute('success') public success,
    @Optional() @Attribute('error') public error,
    @Optional() @Attribute('alert') public alert
  ) {}

  ngOnInit(): void {}

  onClose(event: Event) {
    this.closed.emit(event);
    this.isOpen = false;
  }
}
