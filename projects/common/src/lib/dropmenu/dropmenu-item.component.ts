import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cca-common-dropmenu-item',
  templateUrl: './dropmenu-item.component.html',
  styleUrls: ['./dropmenu-item.component.scss'],
})
export class DropmenuItemComponent implements OnInit {
  @Input() href: string;

  constructor() {}

  ngOnInit(): void {}
}
