import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit change on click', () => {
    const changedSpy = jest.spyOn(component.changed, 'emit');

    component.checked = false;
    component.disabled = false;

    const radio = fixture.debugElement.nativeElement.querySelector('input');

    radio.click();

    expect(changedSpy).toHaveBeenCalledTimes(1);
    expect(component.checked).toBeTruthy();
  });

  it('should not emit change on disabled radio button click', () => {
    const changedSpy = jest.spyOn(component.changed, 'emit');

    component.disabled = true;

    const radio = fixture.debugElement.nativeElement.querySelector('input');

    radio.click();

    expect(changedSpy).toHaveBeenCalledTimes(0);
  });

  it('should bubble emit change when checked', () => {
    const radioChangeHandlerSpy = jest.spyOn(component, 'radioChangeHandler');

    component.checked = false;

    const radio = fixture.debugElement.nativeElement.querySelector('input');

    radio.click();

    expect(radioChangeHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should not bubble emit change when not checked', () => {
    const radioChangeHandlerSpy = jest.spyOn(component, 'radioChangeHandler');
    const eventMock = { target: { checked: false } };

    component.onChange(eventMock);

    expect(radioChangeHandlerSpy).toHaveBeenCalledTimes(0);
  });

  it('should register radio change handler', () => {
    const registerRadioChangeHandlerSpy = jest.spyOn(
      component,
      'registerRadioChangeHandler'
    );

    const fnMock = (e: string) => e;

    component.registerRadioChangeHandler(fnMock);

    expect(registerRadioChangeHandlerSpy).toHaveBeenCalledTimes(1);
    expect(component.radioChangeHandler.toString()).toEqual(fnMock.toString());
  });
});
