import {
  Component,
  OnInit,
  Output,
  Optional,
  Attribute,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'com-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() toastStyle: 'success' | 'error' | 'alert' | 'info';

  @Output() closed = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}
}
