import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { NgTemplateNameDirective } from './ng-template-name.directive';

// TODO: fix next/previous and lastPage/firstPage tabindex behavior. It's currently getting stuck.

export interface TableColumn {
  title: string;
  field: string;
  width?: string;
}

@Component({
  selector: 'com-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterContentInit {
  // Table data
  private _data: object[] = [];
  private _columns: TableColumn[];

  // Paginating
  private _pageSize: number;
  private _minPageSize: number;
  private _maxPageSize: number;
  private _pageStep: number;

  private _pageIndex: number;
  private _totalPages: number;

  /**
   * @internal
   */
  actionTemplateRef: TemplateRef<any>;

  /**
   * @internal
   */
  showActions = false;

  /**
   * @internal
   */
  disableMap = {
    firstPage: false,
    previous: false,
    next: false,
    lastPage: false,
  };

  /**
   * @internal
   */
  acessibleStateMap = {
    refresh: false,
    firstPage: false,
    previous: false,
    next: false,
    lastPage: false,
  };

  /**
   * Current table data source. It should at least match column fields
   */
  @Input()
  set data(data: object[]) {
    this._data = data;
  }
  get data(): object[] {
    return this._data;
  }

  /**
   * Current table column description. It should at least has an title and field key,
   * You can also set the column width here!
   *
   * @type { TableColumn[] }
   */
  @Input()
  set columns(columns: TableColumn[]) {
    this._columns = columns;
  }
  get columns(): TableColumn[] {
    return this._columns;
  }

  @Input()
  set pageSize(size: number) {
    this._pageSize = size;
  }
  get pageSize(): number {
    return this._pageSize;
  }

  @Input()
  set minPageSize(size: number) {
    this._minPageSize = size;
  }
  get minPageSize(): number {
    return this._minPageSize;
  }

  @Input()
  set maxPageSize(size: number) {
    this._maxPageSize = size;
  }
  get maxPageSize(): number {
    return this._maxPageSize;
  }

  @Input()
  set pageStep(size: number) {
    this._pageStep = size;
  }
  get pageStep(): number {
    return this._pageStep;
  }

  @Input()
  set pageIndex(i: number) {
    this._pageIndex = i;
    this.toggleButtons();
  }
  get pageIndex(): number {
    return this._pageIndex;
  }

  @Input()
  set totalPages(total: number) {
    this._totalPages = total;
  }
  get totalPages(): number {
    return this._totalPages;
  }

  /**
   * @default true
   */
  @Input() paginated: boolean = true;

  @Output() lastPage = new EventEmitter();
  @Output() firstPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();
  @Output() previousPage = new EventEmitter();

  @Output() refresh = new EventEmitter();

  @Output() pageSizeChanged = new EventEmitter();
  @Output() pageIndexChanged = new EventEmitter();

  /**
   * @internal
   */
  @ViewChild('defaultColumn') defaultColumnRef: TemplateRef<any>;

  /**
   * @internal
   */
  @ContentChildren(NgTemplateNameDirective) _templates: QueryList<
    NgTemplateNameDirective
  >;

  constructor() {}

  ngOnInit(): void {
    this.toggleButtons();
  }

  ngAfterContentInit(): void {
    this.actionTemplateRef = this.getTemplate('action');

    if (this.actionTemplateRef) {
      this.showActions = true;
    }
  }

  /**
   * @internal
   */
  getTemplate(name: string): TemplateRef<any> {
    const dir = this._templates.find((d) => d.name === name);
    return dir ? dir.template : null;
  }

  /**
   * @internal
   */
  handleFieldTemplateRef(field: string): TemplateRef<any> {
    const fieldRef = this.getTemplate(field);

    return fieldRef ? fieldRef : this.defaultColumnRef;
  }

  /**
   * @internal
   */
  updateButtonsState(
    buttonList: Array<'next' | 'previous' | 'lastPage' | 'firstPage'>,
    value: boolean
  ) {
    for (const button of buttonList) {
      this.disableMap[button] = value;
    }
  }

  /**
   * @internal
   */
  updateAcessibilityState(
    state: 'firstPage' | 'lastPage' | 'next' | 'previous',
    value: boolean
  ) {
    this.acessibleStateMap[state] = value;
    return true;
  }

  /**
   * @internal
   */
  toggleButtons() {
    if (this.pageIndex <= 1) {
      this.updateButtonsState(['previous', 'firstPage'], true);
    } else {
      this.updateButtonsState(['previous', 'firstPage'], false);
    }

    if (this.pageIndex >= this.totalPages) {
      this.updateButtonsState(['next', 'lastPage'], true);
    } else {
      this.updateButtonsState(['next', 'lastPage'], false);
    }
  }

  /**
   * @internal
   */
  onLastPage(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.lastPage.emit(event);
    this.toggleButtons();
    return true;
  }

  /**
   * @internal
   */
  onFirstPage(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.firstPage.emit(event);
    this.toggleButtons();
    return true;
  }

  /**
   * @internal
   */
  onNextPage(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.nextPage.emit(event);
    this.toggleButtons();
    return true;
  }

  /**
   * @internal
   */
  onPreviousPage(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.previousPage.emit(event);
    this.toggleButtons();
    return true;
  }

  /**
   * @internal
   */
  onRefresh(event: Event | KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return false;
      }
    }

    this.refresh.emit(event);
    return true;
  }

  /**
   * @internal
   */
  onPageIndexChange(pageIndex: string) {
    this.pageIndexChanged.emit(pageIndex);
  }

  /**
   * @internal
   */
  onPageSizeChange(pageSize: string) {
    this.toggleButtons();
    this.pageSizeChanged.emit(pageSize);
  }
}
