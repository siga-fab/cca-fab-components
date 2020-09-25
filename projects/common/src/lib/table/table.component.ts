import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  ContentChild,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'com-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
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

  @ViewChild('actionWrapper') actionWrapper: ElementRef;
  @ContentChild('action', { static: false }) actionTemplateRef: TemplateRef<
    any
  >;

  totalPages: number;
  headers: string[] = [];
  showActions = false;

  disableMap = {
    firstPage: false,
    previous: false,
    next: false,
    lastPage: false,
  };

  acessibleStateMap = {
    refresh: false,
    firstPage: false,
    previous: false,
    next: false,
    lastPage: false,
  };

  constructor(public resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    const headers = new Set();

    for (const data of this.dataSource) {
      for (const key of Object.keys(data)) {
        headers.add(key);
      }
    }

    this.totalPages = Math.ceil(this.totalEntries / this.pageSize);
    this.headers = [...headers] as string[];

    this.toggleButtons();
  }

  ngAfterViewInit(): void {
    this.showActions = !!this.actionWrapper.nativeElement.children.length;
  }

  updateButtonsState(
    buttonList: Array<'next' | 'previous' | 'lastPage' | 'firstPage'>,
    value: boolean
  ) {
    for (const button of buttonList) {
      this.disableMap[button] = value;
    }
  }

  toggleButtons() {
    if (this.pageIndex > this.totalPages) {
      this.pageIndex = this.totalPages;
    }

    if (this.pageIndex === 1) {
      this.updateButtonsState(['previous', 'firstPage'], true);
    } else {
      this.updateButtonsState(['previous', 'firstPage'], false);
    }

    if (this.pageIndex === this.totalPages) {
      this.updateButtonsState(['next', 'lastPage'], true);
    } else {
      this.updateButtonsState(['next', 'lastPage'], false);
    }
  }

  onLastPage(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.pageIndex = this.totalPages;
    this.lastPage.emit(this.totalPages);

    this.toggleButtons();
    return true;
  }

  onFirstPage(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.pageIndex = 1;
    this.firstPage.emit(1);
    this.disableMap.firstPage = true;

    this.toggleButtons();
    return true;
  }

  onNextPage(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }
    this.nextPage.emit(
      this.pageIndex < this.totalPages ? ++this.pageIndex : this.pageIndex
    );

    this.toggleButtons();

    return true;
  }

  onPreviousPage(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.previousPage.emit(
      this.pageIndex > 1 ? --this.pageIndex : this.pageIndex
    );

    this.toggleButtons();
    return true;
  }

  onRefresh(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.refresh.emit(this.pageIndex);

    return true;
  }

  onPageIndexChange(pageIndex: string) {
    this.pageIndex = parseInt(pageIndex, 10);
    this.toggleButtons();
    this.pageIndexChange.emit(this.pageIndex);
  }

  onPageSizeChange(pageSize: string) {
    this.pageSize = parseInt(pageSize, 10);
    this.totalPages = Math.ceil(this.totalEntries / parseInt(pageSize, 10));
    this.toggleButtons();
    this.pageSizeChange.emit(this.pageSize);
  }
}
