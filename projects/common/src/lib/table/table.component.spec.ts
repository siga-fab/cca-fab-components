import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { InputComponent } from '../input/input.component';
import { IconComponent } from '../icon/icon.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const PAGE_SIZE = 10;
  const MAX_PAGE_SIZE = 50;
  const PAGE_START_INDEX = 10;
  const TOTAL_PAGES = 20;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, InputComponent, IconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    component.pageSize = PAGE_SIZE;
    component.maxPageSize = MAX_PAGE_SIZE;
    component.pageIndex = PAGE_START_INDEX;
    component.totalPages = TOTAL_PAGES;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit nextPage', () => {
    const onNextPageSpy = jest.spyOn(component, 'onNextPage');

    component.onNextPage(new Event(null));
    expect(onNextPageSpy).toHaveBeenCalled();
  });

  it('should emit nextPage on keyboard event on Enter/Space', () => {
    const onNextPageSpy = jest.spyOn(component, 'onNextPage');
    const MOCK_EVENT_ENTER = new KeyboardEvent('keydown', { key: 'Enter' });
    const MOCK_EVENT_SPACE = new KeyboardEvent('keydown', { key: ' ' });

    component.onNextPage(MOCK_EVENT_ENTER);
    component.onNextPage(MOCK_EVENT_SPACE);

    expect(onNextPageSpy).toHaveBeenCalledTimes(2);
  });

  it('should not emit nextPage on keyboard event other than Enter/Space', () => {
    const onNextPageSpy = jest.spyOn(component, 'onNextPage');
    const MOCK_EVENT = new KeyboardEvent('keydown', { key: 'Escape' });
    let hasEmitted = false;

    component.firstPage.subscribe(() => (hasEmitted = true));

    component.onNextPage(MOCK_EVENT);

    expect(onNextPageSpy).toHaveBeenCalled();
    expect(hasEmitted).toBe(false);
  });

  it('shoudl emit lastPage', () => {
    const onLastPageSpy = jest.spyOn(component, 'onLastPage');

    component.onLastPage(new Event(null));
    expect(onLastPageSpy).toHaveBeenCalled();
  });

  it('should emit lastPage on keyboard event on Enter/Space', () => {
    const onLastPageSpy = jest.spyOn(component, 'onLastPage');

    const MOCK_EVENT_ENTER = new KeyboardEvent('keydown', { key: 'Enter' });
    const MOCK_EVENT_SPACE = new KeyboardEvent('keydown', { key: ' ' });

    component.onLastPage(MOCK_EVENT_ENTER);
    component.onLastPage(MOCK_EVENT_SPACE);

    expect(onLastPageSpy).toHaveBeenCalledTimes(2);
  });

  it('should not emit lastPage on keyboard event other than Enter/Space', () => {
    const onLastPageSpy = jest.spyOn(component, 'onLastPage');
    const MOCK_EVENT = new KeyboardEvent('keydown', { key: 'Escape' });
    const hasEmitted = false;

    component.onLastPage(MOCK_EVENT);

    expect(onLastPageSpy).toHaveBeenCalled();
    expect(hasEmitted).toBe(false);
  });

  it('should emit previousPage and return previous page', () => {
    const onPreviousPageSpy = jest.spyOn(component, 'onPreviousPage');

    component.onPreviousPage(new Event(null));
    expect(onPreviousPageSpy).toHaveBeenCalled();
  });

  it('should emit previousPage on keyboard event on Enter/Space', () => {
    const onPreviousPageSpy = jest.spyOn(component, 'onPreviousPage');
    const MOCK_EVENT_ENTER = new KeyboardEvent('keydown', { key: 'Enter' });
    const MOCK_EVENT_SPACE = new KeyboardEvent('keydown', { key: ' ' });

    component.onPreviousPage(MOCK_EVENT_ENTER);
    component.onPreviousPage(MOCK_EVENT_SPACE);

    expect(onPreviousPageSpy).toHaveBeenCalledTimes(2);
  });

  it('should not emit previousPage on keyboard event other than Enter/Space', () => {
    const onPreviousPageSpy = jest.spyOn(component, 'onPreviousPage');
    const MOCK_EVENT = new KeyboardEvent('keydown', { key: 'Escape' });
    let hasEmitted = false;

    component.previousPage.subscribe((res) => (hasEmitted = true));

    component.onPreviousPage(MOCK_EVENT);

    expect(onPreviousPageSpy).toHaveBeenCalled();
    expect(hasEmitted).toBe(false);
  });

  it('should emit firstPage', () => {
    const onFirstPageSpy = jest.spyOn(component, 'onFirstPage');

    component.onFirstPage(new Event(null));
    expect(onFirstPageSpy).toHaveBeenCalled();
  });

  it('should emit firstPage on keyboard event on Enter/Space', () => {
    const onFirstPageSpy = jest.spyOn(component, 'onFirstPage');
    const MOCK_EVENT_ENTER = new KeyboardEvent('keydown', { key: 'Enter' });
    const MOCK_EVENT_SPACE = new KeyboardEvent('keydown', { key: ' ' });

    component.onFirstPage(MOCK_EVENT_ENTER);
    component.onFirstPage(MOCK_EVENT_SPACE);

    expect(onFirstPageSpy).toHaveBeenCalledTimes(2);
  });

  it('should not emit firstPage on keyboard event other than Enter/Space', () => {
    const onFirstPageSpy = jest.spyOn(component, 'onFirstPage');
    const MOCK_EVENT = new KeyboardEvent('keydown', { key: 'Escape' });
    let hasEmitted = false;

    component.firstPage.subscribe((res) => (hasEmitted = true));

    component.onFirstPage(MOCK_EVENT);

    expect(onFirstPageSpy).toHaveBeenCalled();
    expect(hasEmitted).toBe(false);
  });

  it('should emit refresh', () => {
    const MOCK_EVENT = new Event(null);
    const onRefreshSpy = jest.spyOn(component, 'onRefresh');

    component.onRefresh(MOCK_EVENT);
    expect(onRefreshSpy).toHaveBeenCalled();
  });

  it('should emit refresh with a keyboard event', () => {
    const MOCK_EVENT_ENTER = new KeyboardEvent(null, { key: 'Enter' });
    const MOCK_EVENT_SPACE = new KeyboardEvent(null, { key: ' ' });
    const onRefreshSpy = jest.spyOn(component, 'onRefresh');

    component.onRefresh(MOCK_EVENT_ENTER);
    component.onRefresh(MOCK_EVENT_SPACE);
    expect(onRefreshSpy).toHaveBeenCalledTimes(2);
  });

  it('should not emit refresh with a keyboard event', () => {
    const MOCK_EVENT = new KeyboardEvent(null, { key: 'Escape' });
    const onRefreshSpy = jest.spyOn(component, 'onRefresh');

    component.onRefresh(MOCK_EVENT);
    expect(onRefreshSpy).toHaveBeenCalled();
  });

  it('should emit pageIndexChange', () => {
    const onPageIndexChangeSpy = jest.spyOn(component, 'onPageIndexChange');
    const NEW_INDEX = component.totalPages - 2;

    component.onPageIndexChange(String(NEW_INDEX));
    expect(onPageIndexChangeSpy).toHaveBeenCalled();
  });

  it('should emit pageSizeChange', () => {
    const onPageSizeChangeSpy = jest.spyOn(component, 'onPageSizeChange');
    const NEW_PAGE_SIZE = component.maxPageSize - 2;

    component.onPageSizeChange(String(NEW_PAGE_SIZE));
    expect(onPageSizeChangeSpy).toHaveBeenCalled();
  });
});
