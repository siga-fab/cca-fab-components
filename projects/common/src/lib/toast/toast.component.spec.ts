import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastModule } from './toast.module';
import { ToastComponent } from './toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToastModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close on button click', () => {
    const onCloseSpy = jest.spyOn(component, 'onClose');
    const closedEmitSpy = jest.spyOn(component.closed, 'emit');

    const button = fixture.debugElement.nativeElement.querySelector('button');

    button.click();

    expect(onCloseSpy).toHaveBeenCalledTimes(1);
    expect(closedEmitSpy).toHaveBeenCalledTimes(1);
  });
});
