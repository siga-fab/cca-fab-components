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

  disableMap = {
    firstPage: false,
    lastPage: false,
    previous: false,
    next: false,
  };

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

  private updateButtons(
    buttonList: Array<'lastPage' | 'firstPage' | 'previous' | 'next'>,
    value: boolean
  ) {
    for (const button of buttonList) {
      this.disableMap[button] = value;
    }
  }

  onLastPage() {
    this.pageIndex = this.totalPages;
    this.lastPage.emit(this.totalPages);

    this.updateButtons(['lastPage', 'next'], true);
    this.updateButtons(['firstPage', 'previous'], false);
  }

  onFirstPage() {
    this.pageIndex = 1;
    this.firstPage.emit(1);
    this.disableMap.firstPage = true;

    this.updateButtons(['lastPage', 'next'], false);
    this.updateButtons(['firstPage', 'previous'], true);
  }

  onNextPage() {
    this.nextPage.emit(
      this.pageIndex < this.totalPages ? ++this.pageIndex : this.pageIndex
    );

    if (this.pageIndex === this.totalPages) {
      this.updateButtons(['lastPage', 'next'], true);
    }

    if (this.pageIndex !== this.totalPages) {
      this.updateButtons(['firstPage', 'previous'], false);
    }
  }

  onPreviousPage() {
    this.previousPage.emit(
      this.pageIndex > 1 ? --this.pageIndex : this.pageIndex
    );

    if (this.pageIndex === 1 && this.totalPages > 1) {
      this.updateButtons(['firstPage', 'previous'], true);
    }

    if (this.pageIndex !== this.totalPages) {
      this.updateButtons(['lastPage', 'next'], false);
    }
  }

  onRefresh(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter') {
        return;
      }
    }
    this.refresh.emit(this.pageIndex);
  }

  onPageIndexChange(pageIndex: number) {
    this.pageIndexChange.emit(pageIndex);
  }

  onPageSizeChange(pageSize: number) {
    this.totalPages = Math.ceil(this.totalEntries / pageSize);
    // if(this.pageIndex > this.totalPages){
    //   this.pageIndex = this.totalPages
    // }
    this.pageIndex = 1;
    this.pageSizeChange.emit(pageSize);
  }
}
