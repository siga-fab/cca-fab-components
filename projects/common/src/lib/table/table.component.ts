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
  @Input() maxPageSize: number;
  @Input() pageIndex = 1;
  @Input() totalEntries: number;
  @Input() dataSource = [{ default: 'default' }];

  totalPages: number;
  headers: string[] = [];

  constructor() {}

  ngOnInit(): void {
    const headers = new Set();

    for (const data of this.dataSource) {
      for (const key of Object.keys(data)) {
        headers.add(key);
      }
    }

    this.totalPages = Math.ceil(this.totalEntries / this.pageSize);
    this.headers = [...headers] as string[];

    // console.log(this.headers);
  }

  onLastPage() {
    this.pageIndex = this.totalPages;
    this.lastPage.emit(this.totalPages);
  }

  onFirstPage() {
    this.pageIndex = 1;
    this.firstPage.emit(1);
  }

  onNextPage() {
    this.nextPage.emit(
      this.pageIndex < this.totalPages ? ++this.pageIndex : this.pageIndex
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
    this.totalPages = Math.ceil(this.totalEntries / pageSize);
    this.pageSizeChange.emit(pageSize);
  }
}
