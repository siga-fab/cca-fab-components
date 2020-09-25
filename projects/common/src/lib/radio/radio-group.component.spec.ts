import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { RadioModule } from './radio.module';
import { RadioGroupComponent } from './radio-group.component';
import { RadioComponent } from './radio.component';

@Component({
  // tslint:disable-next-line
  selector: 'radio-group-mock-component',
  template: `
    <com-radio-group [(ngModel)]="radio">
      <com-radio *ngFor="let number of radios" [value]="number">
        Radio {{ number }}
      </com-radio>
    </com-radio-group>
  `,
})
class RadioGroupMockComponent {
  radios = ['one', 'two', 'three', 'four', 'five', 'six'];
  radio = 'two';
}

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioGroupMockComponent],
      imports: [RadioModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupMockComponent);
    component = fixture.debugElement.query(By.directive(RadioGroupComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle childs', () => {
    const updateRadiosSpy = jest.spyOn(component, 'updateRadios');
    const updateRadioChangeHandlersSpy = jest.spyOn(
      component,
      'updateRadioChangeHandlers'
    );

    component.ngAfterContentInit();
    component.ngAfterViewInit();

    expect(updateRadioChangeHandlersSpy).toHaveBeenCalled();
    expect(updateRadiosSpy).toHaveBeenCalled();

    expect(component.radios.length).toBe(6);
    expect(component.selected.value).toBe('two');
  });

  it('should select radio on click', () => {
    const radio = fixture.debugElement.query(By.directive(RadioComponent));

    radio.triggerEventHandler('click', null);
    radio.nativeElement.querySelector('input').click();

    expect(fixture.componentInstance.radio).toBe('one');
  });
});
