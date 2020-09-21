import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { InputComponent } from '../input/input.component';
import { IconComponent } from '../icon/icon.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const PAGE_SIZE = 10;
  const MAX_PAGE_SIZE = 50;
  const PAGE_START_INDEX = 1;
  const TOTAL_ENTRIES = 200;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, InputComponent, IconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.pageSize = PAGE_SIZE;
    component.maxPageSize = MAX_PAGE_SIZE;
    component.pageIndex = PAGE_START_INDEX;
    component.totalEntries = TOTAL_ENTRIES;
    component.totalPages = Math.ceil(TOTAL_ENTRIES / PAGE_SIZE);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit nextPage and return next page', () => {
    const onNextPageSpy = jest.spyOn(component, 'onNextPage');

    component.nextPage.subscribe((res) => {
      expect(res).toBe(PAGE_START_INDEX + 1);
    });

    component.onNextPage();
    expect(onNextPageSpy).toHaveBeenCalled();
  });

  it('should emit nextPage and return max page possible', () => {
    const onNextPageSpy = jest.spyOn(component, 'onNextPage');
    const NEW_INDEX = component.totalPages;
    component.pageIndex = NEW_INDEX;

    component.nextPage.subscribe((res) => {
      expect(res).toBe(NEW_INDEX);
    });

    component.onNextPage();
    expect(onNextPageSpy).toHaveBeenCalled();
  });

  it('shoudl emit lastPage', () => {
    const onLastPageSpy = jest.spyOn(component, 'onLastPage');

    component.lastPage.subscribe((res) => {
      expect(res).toBe(component.totalPages);
    });

    component.onLastPage();
    expect(onLastPageSpy).toHaveBeenCalled();
  });

  it('should emit previousPage and return min page possible', () => {
    const onPreviousPageSpy = jest.spyOn(component, 'onPreviousPage');
    const MIN_PAGE = 1;

    component.previousPage.subscribe((res) => {
      expect(res).toBe(MIN_PAGE);
    });

    component.onPreviousPage();
    expect(onPreviousPageSpy).toHaveBeenCalled();
  });

  it('should emit previousPage and return previous page', () => {
    const onPreviousPageSpy = jest.spyOn(component, 'onPreviousPage');
    const NEW_INDEX = 5;
    component.pageIndex = NEW_INDEX;

    component.previousPage.subscribe((res) => {
      expect(res).toBe(NEW_INDEX - 1);
    });

    component.onPreviousPage();
    expect(onPreviousPageSpy).toHaveBeenCalled();
  });

  it('should emit firstPage', () => {
    const onFirstPageSpy = jest.spyOn(component, 'onFirstPage');

    component.firstPage.subscribe((res) => {
      expect(res).toBe(PAGE_START_INDEX);
    });

    component.onFirstPage();
    expect(onFirstPageSpy).toHaveBeenCalled();
  });

  it('should emit refresh', () => {
    const MOCK_EVENT = new Event(null);
    const onRefreshSpy = jest.spyOn(component, 'onRefresh');

    component.refresh.subscribe((res) => {
      expect(res).toBe(component.pageIndex);
    });

    component.onRefresh(MOCK_EVENT);
    expect(onRefreshSpy).toHaveBeenCalled();
  });

  it('should emit refresh with a keyboard event', () => {
    const MOCK_EVENT = new KeyboardEvent(null, { key: 'Enter' });
    const onRefreshSpy = jest.spyOn(component, 'onRefresh');

    component.refresh.subscribe((res) => {
      expect(res).toBe(component.pageIndex);
    });

    component.onRefresh(MOCK_EVENT);
    expect(onRefreshSpy).toHaveBeenCalled();
  });

  it('should not emit refresh with a keyboard event', () => {
    const MOCK_EVENT = new KeyboardEvent(null, { key: 'Escape' });
    const onRefreshSpy = jest.spyOn(component, 'onRefresh');

    component.refresh.subscribe((res) => {
      expect(res).toBe(component.pageIndex);
    });

    component.onRefresh(MOCK_EVENT);
    expect(onRefreshSpy).toHaveBeenCalled();
  });

  it('should emit pageIndexChange', () => {
    const onPageIndexChangeSpy = jest.spyOn(component, 'onPageIndexChange');
    const NEW_INDEX = component.totalPages / 2;

    component.pageIndexChange.subscribe((res) => {
      expect(res).toBe(NEW_INDEX);
    });

    component.onPageIndexChange(String(NEW_INDEX));
    expect(onPageIndexChangeSpy).toHaveBeenCalled();
  });

  it('should emit pageSizeChange', () => {
    const onPageSizeChangeSpy = jest.spyOn(component, 'onPageSizeChange');
    const NEW_PAGE_SIZE = component.maxPageSize / 2;

    component.pageSizeChange.subscribe((res) => {
      expect(res).toBe(NEW_PAGE_SIZE);
    });

    component.onPageSizeChange(String(NEW_PAGE_SIZE));
    expect(onPageSizeChangeSpy).toHaveBeenCalled();
  });

  it('should set page index equals to last page index when page index is bigger', () => {
    const CURRENT_INDEX = 5;
    const TOTAL_PAGES = 3;
    const toggleButtonsSpy = jest.spyOn(component, 'toggleButtons');

    component.pageIndex = CURRENT_INDEX;
    component.totalPages = TOTAL_PAGES;

    component.toggleButtons();

    expect(toggleButtonsSpy).toHaveBeenCalled();
    expect(component.pageIndex).toBe(component.totalPages);
  });
});
