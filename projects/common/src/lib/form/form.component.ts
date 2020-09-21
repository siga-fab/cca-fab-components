import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Optional,
  Attribute,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cca-common-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() id?: string;
  @Input() formGroup: FormGroup;

  @Output() ngSubmit = new EventEmitter<any>();

  constructor(@Optional() @Attribute('transparent') public transparent) {}

  ngOnInit(): void {}
}
