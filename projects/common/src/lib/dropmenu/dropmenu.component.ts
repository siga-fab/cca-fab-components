import { Component, OnInit, Input, Attribute, Optional } from '@angular/core';

@Component({
  selector: 'cca-common-dropmenu',
  templateUrl: './dropmenu.component.html',
  styleUrls: ['./dropmenu.component.scss'],
})
export class DropmenuComponent implements OnInit {
  @Input() name: string;

  constructor(@Optional() @Attribute('negative') public negative) {}

  ngOnInit(): void {}
}
