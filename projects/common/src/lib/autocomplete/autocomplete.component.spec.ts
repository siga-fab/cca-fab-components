import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteModule } from './autocomplete.module';

describe('SelectComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  const MOCK_ELEMENT = document.createElement('ul');
  const MOCK_OPTIONS = ['a', 'b', 'c', 'd'];
  const CREATE_KEYBOARD_MOCK_EVENT = (key) =>
    new KeyboardEvent('keydown', { key });

  // JSDOM não implementa essa função
  window.HTMLLIElement.prototype.scrollIntoView = () => {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AutocompleteModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    for (let i = 0; i < 10; ++i) {
      MOCK_ELEMENT.appendChild(document.createElement('li'));
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dropdown and set all necessary properties after calling open function', () => {
    const openSpy = jest.spyOn(component, 'open');

    component.open();

    expect(document.activeElement).toBe(component.inputElement);
    expect(component.isOpen).toBe(true);
    expect(openSpy).toHaveBeenCalled();
  });

  it('should open the dropdown and set selectedIndex to 0 if highlightFirst is true', () => {
    const openSpy = jest.spyOn(component, 'open');
    component.highlightFirst = true;

    component.open();

    expect(component.selectedIndex).toBe(0);
    expect(openSpy).toHaveBeenCalled();
  });

  it('should close the dropdown, emit the event and set all necessary properties after calling close function', () => {
    const closeSpy = jest.spyOn(component, 'close');

    component.close();

    expect(component.selectedIndex).toBe(null);
    expect(component.inputElement).not.toBe(document.activeElement);
    expect(component.isOpen).toBe(false);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit changed event after immediate change', () => {
    const onImmediateChangeSpy = jest.spyOn(component, 'onImmediateChange');
    const changeValue = 'a';

    component.highlightFirst = false;

    component.changed.subscribe((res) => {
      expect(res).toBe(changeValue);
    });

    component.onImmediateChange(changeValue);

    expect(component.value).toBe(changeValue);
    expect(component.selectedIndex).toBe(null);
    expect(onImmediateChangeSpy).toHaveBeenCalled();
  });

  it('should emit changed event after immediate change and focus first element', () => {
    const onImmediateChangeSpy = jest.spyOn(component, 'onImmediateChange');
    const scrollSpy = jest.spyOn(MOCK_ELEMENT.children[0], 'scrollIntoView');

    const changeValue = 'a';

    component.highlightFirst = true;
    component.optionsParentElement = MOCK_ELEMENT;
    component.options = MOCK_OPTIONS;

    component.changed.subscribe((res) => {
      expect(res).toBe(changeValue);
    });

    component.onImmediateChange(changeValue);

    expect(component.value).toBe(changeValue);
    expect(component.selectedIndex).toBe(0);
    expect(onImmediateChangeSpy).toHaveBeenCalled();
    expect(scrollSpy).toHaveBeenCalled();
  });
});
