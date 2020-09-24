import { Component, OnInit, Optional, Attribute, Input } from '@angular/core';

@Component({
  selector: 'com-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.scss'],
})
export class BreadcrumbItemComponent implements OnInit {
  @Input() href: string;

  constructor(@Optional() @Attribute('selected') public selected) {}

  ngOnInit(): void {}
}
