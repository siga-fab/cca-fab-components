import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'com-dropmenu-item',
  templateUrl: './dropmenu-item.component.html',
  styleUrls: ['./dropmenu-item.component.scss'],
})
export class DropmenuItemComponent implements OnInit {
  @Input() href: string;
  @Input() routerLink: string | Array<any> = [];
  @Input() target: string;
  @Input() rel: string;

  constructor() {}

  ngOnInit(): void {}
}
