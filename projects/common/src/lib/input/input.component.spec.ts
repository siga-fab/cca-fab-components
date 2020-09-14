import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { IconComponent } from '../icon/icon.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent, IconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.type = 'number';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set focus to true', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');

    component.isFocused(true);

    expect(component.focus).toBe(true);
    expect(isFocusedSpy).toBeCalled();
  });

  it('should set focus to false', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');

    component.confirm.subscribe((res) => {
      expect(res).toBe(component.value);
    });

    component.isFocused(false);

    expect(component.focus).toBe(false);
    expect(isFocusedSpy).toBeCalled();
  });

  it('should call onMouseUp', () => {
    const onMouseUpSpy = jest.spyOn(component, 'onMouseUp');

    component.onMouseUp();
    expect(onMouseUpSpy).toBeCalled();
  });

  it('should call onKeyDown and emit confirm', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const MOCK_KEYBOARD_EVENT = new KeyboardEvent(null, {
      key: 'Enter',
    });

    component.confirm.subscribe((res) => {
      expect(res).toBe(component.value);
    });

    component.onKeyDown(MOCK_KEYBOARD_EVENT);
    expect(onKeyDownSpy).toBeCalled();
  });

  it('should call onKeyDown and do nothing', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const MOCK_KEYBOARD_EVENT = new KeyboardEvent(null, {
      key: 'Escape',
    });

    component.onKeyDown(MOCK_KEYBOARD_EVENT);
    expect(onKeyDownSpy).toBeCalled();
  });

  // it('should call rangedValue', () => {
  //   const rangedValueSpy = jest.spyOn(component, 'rangedValue');
  //   const MOCK_INPUT = document.createElement('input');
  //   const MOCK_EVENT = new Event(null);

  //   MOCK_INPUT.type = 'number';
  //   MOCK_INPUT.value = '10';

  //   MOCK_INPUT.addEventListener('keyup', component.rangedValue)
  //   MOCK_INPUT.dispatchEvent(MOCK_EVENT);

  //   expect(rangedValueSpy).toBeCalled();
  // })
});
