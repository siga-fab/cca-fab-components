import {
  Component,
  OnInit,
  Optional,
  Attribute,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'com-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss'],
})
export class FormSectionComponent implements OnInit {
  @HostBinding('class.partly-sized') partlySized = false;

  @Input() description?: string;
  @Input() formTitle?: string;
  @Input() tooltip?: string;

  // A number between 0-99
  @Input() step?: number;

  constructor(
    @Optional() @Attribute('partly') public partly,
    @Optional() @Attribute('block') public block
  ) {}

  ngOnInit(): void {
    this.partlySized = this.partly === '';
  }
}
