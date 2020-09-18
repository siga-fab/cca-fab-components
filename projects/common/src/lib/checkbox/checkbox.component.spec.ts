import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
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

    const checkbox = fixture.debugElement.nativeElement.querySelector('input');

    checkbox.click();

    expect(changedSpy).toHaveBeenCalledTimes(1);
    expect(component.checked).toBeTruthy();
  });

  it('should not emit change on disabled checkbox click', () => {
    const changedSpy = jest.spyOn(component.changed, 'emit');

    component.disabled = true;

    const checkbox = fixture.debugElement.nativeElement.querySelector('input');

    checkbox.click();

    expect(changedSpy).toHaveBeenCalledTimes(0);
  });
});
