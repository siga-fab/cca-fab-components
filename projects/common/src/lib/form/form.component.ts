import { FormGroup } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Optional,
  Attribute,
} from '@angular/core';

@Component({
  selector: 'com-form',
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
