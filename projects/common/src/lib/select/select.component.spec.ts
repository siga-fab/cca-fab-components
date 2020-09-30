import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';
import { SelectOption } from '../../types/select';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  const MOCK_ELEMENT = document.createElement('ul');
  const MOCK_EVENT_FOCUS = new FocusEvent('focus');
  const MOCK_EVENT_BLUR = new FocusEvent('blur');
  const CREATE_KEYBOARD_MOCK_EVENT = (key) =>
    new KeyboardEvent('keydown', { key });

  // JSDOM não implementa essa função
  window.HTMLLIElement.prototype.scrollIntoView = () => {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SelectModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    for (let i = 0; i < 10; ++i) {
      MOCK_ELEMENT.appendChild(document.createElement('li'));
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dropdown, emit the event and set all necessary properties after calling open function', () => {
    const openSpy = jest.spyOn(component, 'open');
    let openedEmitted = false;

    component.opened.subscribe(() => {
      openedEmitted = true;

      expect(openedEmitted).toBe(true);
    });

    component.open();

    expect(component.forcedFocus).toBe(true);
    expect(component.isOpen).toBe(true);
    expect(openSpy).toHaveBeenCalled();
  });

  it('should close the dropdown, emit the event and set all necessary properties after calling close function', () => {
    const closeSpy = jest.spyOn(component, 'close');
    let closedEmitted = false;

    component.opened.subscribe(() => {
      closedEmitted = true;

      expect(closedEmitted).toBe(true);
    });

    component.close();

    expect(component.forcedFocus).toBe(false);
    expect(component.isOpen).toBe(false);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should do nothing on onKeyDown if isOpen is false', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const initialIndex = 2;

    component.isOpen = false;
    component.selectedIndex = initialIndex;
    component.optionsParentElement = MOCK_ELEMENT;

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT('ArrowUp'));

    expect(component.selectedIndex).toBe(initialIndex);
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should change selectedIndex on arrowUp after calling onKeyDown', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const initialIndex = 2;

    component.isOpen = true;
    component.selectedIndex = initialIndex;
    component.optionsParentElement = MOCK_ELEMENT;

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT('ArrowUp'));

    expect(component.selectedIndex).toBe(initialIndex - 1);
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should not change selectedIndex on arrowUp after calling onKeyDown if selectedIndex is 0', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const initialIndex = 0;

    component.isOpen = true;
    component.selectedIndex = initialIndex;
    component.optionsParentElement = MOCK_ELEMENT;

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT('ArrowUp'));

    expect(component.selectedIndex).toBe(initialIndex);
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should change selectedIndex on arrowDown after calling onKeyDown', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const initialIndex = 2;

    component.isOpen = true;
    component.selectedIndex = initialIndex;
    component.optionsParentElement = MOCK_ELEMENT;

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT('ArrowDown'));

    expect(component.selectedIndex).toBe(initialIndex + 1);
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should not change selectedIndex on arrowDown after calling onKeyDown if selectedIndex is equals to options length', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const initialIndex = MOCK_ELEMENT.children.length;

    component.isOpen = true;
    component.options = Array(MOCK_ELEMENT.children.length).fill(0);
    component.selectedIndex = initialIndex;
    component.optionsParentElement = MOCK_ELEMENT;

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT('ArrowDown'));

    expect(component.selectedIndex).toBe(initialIndex);
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should trigger click on Enter or Space after calling onKeyDown', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const initialIndex = 2;

    component.isOpen = true;
    component.selectedIndex = initialIndex;
    component.optionsParentElement = MOCK_ELEMENT;

    const childElement = component.optionsParentElement.children[
      component.selectedIndex
    ] as HTMLLIElement;
    const clickSpy = jest.spyOn(childElement, 'click');

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT('Enter'));

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT(' '));

    expect(component.selectedIndex).toBe(initialIndex);
    expect(onKeyDownSpy).toHaveBeenCalledTimes(2);
    expect(clickSpy).toHaveBeenCalledTimes(2);
  });

  it('should close dropdown after calling onKeyDown with Escape', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const blurSpy = jest.spyOn(component.selectElement, 'blur');
    const initialIndex = 2;

    component.isOpen = true;
    component.selectedIndex = initialIndex;

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT('Escape'));

    expect(component.selectedIndex).toBe(initialIndex);
    expect(onKeyDownSpy).toHaveBeenCalled();
    expect(blurSpy).toHaveBeenCalled();
  });

  it('should do nothing after calling onKeyDown if key is not mapped', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const initialIndex = 2;

    component.isOpen = true;
    component.selectedIndex = initialIndex;

    component.onKeyDown(CREATE_KEYBOARD_MOCK_EVENT('T'));

    expect(component.selectedIndex).toBe(initialIndex);
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should select string item with specified index and emit changed event', () => {
    const selectedItemSpy = jest.spyOn(component, 'selectedItem');
    const indexParam = 2;

    component.options = ['Test 1', 'Test 2', 'Test 3'];

    component.changed.subscribe((res) => {
      expect(res).toBe(component.options[indexParam - 1]);
    });

    component.selectedItem(indexParam);

    expect(component.value).toBe(component.options[indexParam - 1] as string);
    expect(component.selectedIndex).toBe(indexParam);
    expect(selectedItemSpy).toHaveBeenCalled();
  });

  it('should select object item with specified index and emit changed event', () => {
    const selectedItemSpy = jest.spyOn(component, 'selectedItem');
    const indexParam = 2;

    component.options = [
      'Test 1',
      { name: 'Test 2', value: 'Value 2' } as SelectOption,
      'Test 3',
    ];

    component.changed.subscribe((res) => {
      expect(res).toBe(
        (component.options[indexParam - 1] as SelectOption).value
      );
    });

    component.selectedItem(indexParam);

    expect(component.value).toBe(
      (component.options[indexParam - 1] as SelectOption).name
    );
    expect(component.selectedIndex).toBe(indexParam);
    expect(selectedItemSpy).toHaveBeenCalled();
  });

  it('should select none if selection is falsy', () => {
    const selectedItemSpy = jest.spyOn(component, 'selectedItem');
    const indexParam = 0;

    component.options = ['Test 1', 'Test 2', 'Test 3'];

    component.changed.subscribe((res) => {
      expect(res).toBe(null);
    });

    component.selectedItem(indexParam);

    expect(component.value).toBe('');
    expect(component.selectedIndex).toBe(indexParam);
    expect(selectedItemSpy).toHaveBeenCalled();
  });
});
