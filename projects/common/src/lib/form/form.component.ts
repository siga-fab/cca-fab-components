import { Component, OnInit, Input, Optional, Attribute } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'com-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() id?: string;
  @Input() formGroup: FormGroup = new FormGroup({});

  constructor(@Optional() @Attribute('transparent') public transparent) {}

  ngOnInit(): void {}
}
