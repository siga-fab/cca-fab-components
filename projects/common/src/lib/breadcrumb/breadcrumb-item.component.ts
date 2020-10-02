import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'com-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.scss'],
})
export class BreadcrumbItemComponent implements OnInit {
  @Input() routerLink: string | any[] = [];
  @Input() active = false;
  @Input() href: string;
  @Input() rel: string;
  @Input() target: string;

  constructor() {}

  ngOnInit(): void {}
}
