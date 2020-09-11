import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'cca-common-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Output() lastPage = new EventEmitter();
  @Output() firstPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();
  @Output() previousPage = new EventEmitter();

  @Output() refresh = new EventEmitter();

  @Output() pageSizeChange = new EventEmitter();
  @Output() pageIndexChange = new EventEmitter();

  @Input() pageSize: number;
  @Input() pageIndex = 1;
  @Input() dataSource = [{ default: 'default' }];

  headers: string[] = [];

  constructor() {}

  ngOnInit(): void {
    const headers = new Set();

    for (const data of this.dataSource) {
      for (const key of Object.keys(data)) {
        headers.add(key);
      }
    }

    this.headers = [...headers] as string[];

    console.log(this.headers);
  }

  onLastPage() {
    this.pageIndex = this.pageSize;
    this.lastPage.emit(this.pageSize);
  }

  onFirstPage() {
    this.pageIndex = 1;
    this.firstPage.emit(1);
  }

  onNextPage() {
    this.nextPage.emit(
      this.pageIndex < this.pageSize ? ++this.pageIndex : this.pageIndex
    );
  }

  onPreviousPage() {
    this.previousPage.emit(
      this.pageIndex > 1 ? --this.pageIndex : this.pageIndex
    );
  }

  onRefresh() {
    this.refresh.emit(this.pageIndex);
  }

  onPageIndexChange(pageIndex: number) {
    this.pageIndexChange.emit(pageIndex);
  }

  onPageSizeChange(pageSize: number) {
    this.pageSizeChange.emit(pageSize);
  }
}
