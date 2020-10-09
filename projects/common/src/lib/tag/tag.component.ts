import {
  Component,
  OnInit,
  Optional,
  Attribute,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'com-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() selected?: boolean;
  @Output() closed = new EventEmitter();

  constructor(
    @Optional() @Attribute('clickable') public clickable,
    @Optional() @Attribute('primary') public primary,
    @Optional() @Attribute('secondary') public secondary,
    @Optional() @Attribute('closable') public closable
  ) {}

  onClose() {
    this.closed.emit();
  }
}
