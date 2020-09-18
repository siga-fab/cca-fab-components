import {
  Component,
  OnInit,
  ContentChildren,
  forwardRef,
  QueryList,
  Input,
  AfterContentInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Optional,
  Attribute,
} from '@angular/core';

import { RadioComponent } from './radio.component';

@Component({
  selector: 'cca-common-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent
  implements OnInit, AfterContentInit, AfterViewInit {
  static radioGroupCount = 0;

  @ContentChildren(forwardRef(() => RadioComponent)) radios: QueryList<
    RadioComponent
  >;

  @Input() name = `radio-group-${RadioGroupComponent.radioGroupCount++}`;

  @Output() changed = new EventEmitter<string>();

  constructor(@Optional() @Attribute('horizontal') public horizontal) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.radios.changes.subscribe(() => {
      this.handleRadioNames();
      this.handleRadioEvents();
    });

    this.handleRadioEvents();
  }

  ngAfterViewInit(): void {
    this.handleRadioNames();
  }

  handleRadioNames(): void {
    if (this.radios) {
      setTimeout(() => {
        this.radios.forEach((radio) => (radio.name = this.name));
      });
    }
  }

  handleRadioEvents(): void {
    if (this.radios) {
      this.radios.forEach((radio) => {
        radio.registerRadioChangeHandler((value: string) => {
          this.changed.emit(value);
        });
      });
    }
  }
}
