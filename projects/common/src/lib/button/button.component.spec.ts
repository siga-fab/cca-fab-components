import { ButtonComponent } from './button.component';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly trigger animation on button click', fakeAsync(() => {
    const onClickSpy = jest.spyOn(component, 'onClick');

    const button = fixture.debugElement.nativeElement.querySelector('button');

    // first click on btn should trigger the animation
    component.animate = false;
    button.click();
    expect(component.animate).toBeTruthy();

    // click again should do nothing since the animation has not yet ended
    button.click();

    // after the defined animation time, should reset
    tick(component.animateMsTime);
    expect(component.animate).toBeFalsy();

    expect(onClickSpy).toHaveBeenCalledTimes(2);
  }));
});
