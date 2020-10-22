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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set focus to true', () => {
    const MOCK_EVENT = new FocusEvent(null);
    const isFocusedSpy = jest.spyOn(component, 'isFocused');

    component.isFocused(true, MOCK_EVENT);

    expect(component.focus).toBe(true);
    expect(isFocusedSpy).toHaveBeenCalled();
  });

  // it('should show the native placeholder after setting focus to true', () => {
  //   const isFocusedSpy = jest.spyOn(component, 'isFocused');
  //   const ELEMENT: HTMLInputElement = component.input.nativeElement;
  //   const MOCK_EVENT = new FocusEvent(null);
  //   component.placeholder = 'This is a test';

  //   component.isFocused(true, MOCK_EVENT);

  //   expect(component.focus).toBe(true);
  //   expect(isFocusedSpy).toHaveBeenCalled();
  //   expect(ELEMENT.placeholder).toBe(component.placeholder);
  // });

  it('should set focus to false', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');
    const MOCK_EVENT = new FocusEvent(null);

    component.confirm.subscribe((res) => {
      expect(res).toBe(component.value);
    });

    component.isFocused(false, MOCK_EVENT);

    expect(component.focus).toBe(false);
    expect(isFocusedSpy).toHaveBeenCalled();
  });

  it('should clear number interval if set after setting focus to false', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');
    const clearNumberIntervalSpy = jest.spyOn(component, 'clearNumberInterval');
    const MOCK_EVENT = new FocusEvent(null);

    component.numberInterval = 20;

    component.confirm.subscribe((res) => {
      expect(res).toBe(component.value);
    });

    component.isFocused(false, MOCK_EVENT);

    expect(component.focus).toBe(false);
    expect(isFocusedSpy).toHaveBeenCalled();

    expect(clearNumberIntervalSpy).toHaveBeenCalled();
    expect(component.numberInterval).toBeNull();
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
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should call onKeyDown and call rangedValue on number inputs', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const rangedValueSpy = jest.spyOn(component, 'rangedValue');

    component.type = 'number';

    const MOCK_KEYBOARD_EVENT = new KeyboardEvent(null, {
      key: 'Enter',
    });

    component.confirm.subscribe((res) => {
      expect(res).toBe(component.value);
    });

    component.onKeyDown(MOCK_KEYBOARD_EVENT);
    expect(onKeyDownSpy).toHaveBeenCalled();
    expect(rangedValueSpy).toHaveBeenCalled();
  });

  it('should do nothing on rangeValue if type is not number', () => {
    const rangedValueSpy = jest.spyOn(component, 'rangedValue');
    const INITIAL_VALUE = 'test';
    const ELEMENT = component.input.nativeElement;

    component.type = 'text';
    component.value = 'test';

    component.rangedValue(ELEMENT);

    expect(rangedValueSpy).toHaveBeenCalled();
    expect(component.value).toBe('');
  });

  it('should call onKeyDown and do nothing', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');
    const MOCK_KEYBOARD_EVENT = new KeyboardEvent(null, {
      key: 'Escape',
    });

    component.onKeyDown(MOCK_KEYBOARD_EVENT);
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should ignore "+" and "e" in onKeyDown at number inputs', () => {
    const onKeyDownSpy = jest.spyOn(component, 'onKeyDown');

    component.type = 'number';

    const MOCK_KEYBOARD_PLUS_CHAR_EVENT = new KeyboardEvent(null, {
      key: '+',
    });

    const MOCK_KEYBOARD_E_CHAR_EVENT = new KeyboardEvent(null, {
      key: 'e',
    });

    const PLUS_CHAR_RETURN = component.onKeyDown(MOCK_KEYBOARD_PLUS_CHAR_EVENT);
    const E_CHAR_RETURN = component.onKeyDown(MOCK_KEYBOARD_E_CHAR_EVENT);

    expect(onKeyDownSpy).toHaveBeenCalled();
    expect(PLUS_CHAR_RETURN).toBe(false);
    expect(E_CHAR_RETURN).toBe(false);
  });

  it('should call updateValue', () => {
    const updateValueSpy = jest.spyOn(component, 'updateValue');
    const MOCK_EVENT = new Event('change');
    const MOCK_INPUT = document.createElement('input');

    MOCK_INPUT.type = 'text';
    MOCK_INPUT.addEventListener(
      'change',
      component.updateValue.bind(component)
    );

    MOCK_INPUT.dispatchEvent(MOCK_EVENT);

    expect(updateValueSpy).toHaveBeenCalled();
    expect(component.value).toBe(MOCK_INPUT.value);
  });

  // Input Number Only
  it('should call onMouseUp', () => {
    const onMouseUpSpy = jest.spyOn(component, 'onMouseUp');

    component.type = 'number';

    component.onMouseUp();

    expect(component);
    expect(onMouseUpSpy).toHaveBeenCalled();
  });

  // Input number only
  it('should call updateNumberValue and add one', () => {
    const updateValueSpy = jest.spyOn(component, 'updateNumberValue');
    const MOCK_EVENT = new Event('mousedown');
    const MOCK_ELEMENT = document.createElement('div');

    component.type = 'number';

    const INITIAL_VALUE = (component.value = '10');

    MOCK_ELEMENT.addEventListener('mousedown', (event) =>
      component.updateNumberValue(event, 'add')
    );

    MOCK_ELEMENT.dispatchEvent(MOCK_EVENT);

    expect(updateValueSpy).toHaveBeenCalled();
    expect(component.value).toBe(String(parseInt(INITIAL_VALUE, 10) + 1));
  });

  // Input number only
  it('should call updateNumberValue and sub one', () => {
    const updateValueSpy = jest.spyOn(component, 'updateNumberValue');
    const MOCK_EVENT = new Event('mousedown');
    const MOCK_ELEMENT = document.createElement('div');

    const INITIAL_VALUE = (component.value = '10');

    MOCK_ELEMENT.addEventListener('mousedown', (event) =>
      component.updateNumberValue(event, 'sub')
    );

    MOCK_ELEMENT.dispatchEvent(MOCK_EVENT);

    expect(updateValueSpy).toHaveBeenCalled();
    expect(component.value).toBe(String(parseInt(INITIAL_VALUE, 10) - 1));
  });

  it('should call updateNumberValue and respect max value', () => {
    const updateValueSpy = jest.spyOn(component, 'updateNumberValue');
    const MOCK_EVENT = new Event('mousedown');
    const MOCK_ELEMENT = document.createElement('div');
    const MAX_VALUE = 10;

    component.value = '10';
    component.max = MAX_VALUE;

    MOCK_ELEMENT.addEventListener('mousedown', (event) =>
      component.updateNumberValue(event, 'add')
    );

    MOCK_ELEMENT.dispatchEvent(MOCK_EVENT);

    expect(updateValueSpy).toHaveBeenCalled();
    expect(component.value).toBe(String(MAX_VALUE));
  });

  it('should call updateNumberValue and respect min value', () => {
    const updateValueSpy = jest.spyOn(component, 'updateNumberValue');
    const MOCK_EVENT = new Event('mousedown');
    const MOCK_ELEMENT = document.createElement('div');
    const MIN_VALUE = 10;

    component.value = '10';
    component.min = MIN_VALUE;

    MOCK_ELEMENT.addEventListener('mousedown', (event) =>
      component.updateNumberValue(event, 'sub')
    );

    MOCK_ELEMENT.dispatchEvent(MOCK_EVENT);

    expect(updateValueSpy).toHaveBeenCalled();
    expect(component.value).toBe(String(MIN_VALUE));
  });

  it('should update value at interval on updateNumberValue if numberIntervalCounter is bigger than 10', () => {
    const updateValueSpy = jest.spyOn(component, 'updateNumberValue');
    const MOCK_EVENT = new Event('mousedown');
    const MOCK_ELEMENT = document.createElement('div');
    const INITIAL_VALUE = '10';

    component.value = INITIAL_VALUE;
    component.numberIntervalCounter = 11;

    MOCK_ELEMENT.addEventListener('mousedown', (event) =>
      component.updateNumberValue(event, 'add')
    );
    MOCK_ELEMENT.dispatchEvent(MOCK_EVENT);

    expect(updateValueSpy).toHaveBeenCalled();
    expect(component.value !== INITIAL_VALUE).toBe(true);
  });

  it('should use zero if value is invalid on type number', () => {
    const updateValueSpy = jest.spyOn(component, 'updateNumberValue');
    const MOCK_EVENT = new Event('mousedown');
    const MOCK_ELEMENT = document.createElement('div');
    const INITIAL_VALUE = '';

    component.value = INITIAL_VALUE;

    MOCK_ELEMENT.addEventListener('mousedown', (event) =>
      component.updateNumberValue(event, 'add')
    );

    MOCK_ELEMENT.dispatchEvent(MOCK_EVENT);

    expect(updateValueSpy).toHaveBeenCalled();
    expect(component.value).toBe('1');
  });

  // Input number only
  it('should respect min property limit on isFocused', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');
    const INPUT_ELEMENT = component.input.nativeElement;
    const MIN_VALUE = 5;
    const MOCK_EVENT = new FocusEvent(null);

    component.type = 'number';
    component.min = MIN_VALUE;
    component.value = INPUT_ELEMENT.value = '4';

    component.confirm.subscribe((res) => {
      expect(res).toBe(String(MIN_VALUE));
    });

    component.isFocused(false, MOCK_EVENT);
    expect(isFocusedSpy).toHaveBeenCalled();
  });

  // Input number only
  it('should respect max property limit on isFocused', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');
    const INPUT_ELEMENT = component.input.nativeElement;
    const MAX_VALUE = 5;
    const MOCK_EVENT = new FocusEvent(null);

    component.type = 'number';
    component.max = MAX_VALUE;
    component.value = INPUT_ELEMENT.value = '7';

    component.confirm.subscribe((res) => {
      expect(res).toBe(String(MAX_VALUE));
    });

    component.isFocused(false, MOCK_EVENT);
    expect(isFocusedSpy).toHaveBeenCalled();
  });

  it('should style label when focused', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');
    const MOCK_EVENT = new FocusEvent(null);

    component.label = 'Test';

    const LABEL_ELEMENT: HTMLLabelElement =
      component.input.nativeElement.parentElement;

    component.confirm.subscribe((res) => {
      expect(LABEL_ELEMENT.classList.contains('focused')).toBe(true);
    });

    component.isFocused(true, MOCK_EVENT);

    expect(isFocusedSpy).toHaveBeenCalled();
  });

  it('should style label when not focused', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');
    const MOCK_EVENT = new FocusEvent(null);

    component.label = 'Test';

    const LABEL_ELEMENT: HTMLLabelElement =
      component.input.nativeElement.parentElement;

    component.confirm.subscribe((res) => {
      expect(LABEL_ELEMENT.classList.contains('colored')).toBe(true);
    });

    component.isFocused(true, MOCK_EVENT);

    expect(isFocusedSpy).toHaveBeenCalled();
  });
});
