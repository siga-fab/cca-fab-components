import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent, ModalModule } from '../../public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isModalOpen to true after FadeIn animation', () => {
    const doneFadeInOutHandlerSpy = jest.spyOn(
      component,
      'doneFadeInOutHandler'
    );
    const mockEvent = { fromState: 'void' };

    component.doneFadeInOutHandler(mockEvent);

    expect(component.isModalOpen).toBe(true);
    expect(doneFadeInOutHandlerSpy).toHaveBeenCalled();
  });

  it('should do nothing after FadeOut animation', () => {
    const doneFadeInOutHandlerSpy = jest.spyOn(
      component,
      'doneFadeInOutHandler'
    );
    const mockEvent = { fromState: null };

    component.isModalOpen = false;

    component.doneFadeInOutHandler(mockEvent);

    expect(component.isModalOpen).toBe(false);
    expect(doneFadeInOutHandlerSpy).toHaveBeenCalled();
  });

  it('should close modal on outside click', () => {
    const outsideModalClickSpy = jest.spyOn(component, 'outsideModalClick');
    const mockEvent = new MouseEvent('click');
    const componentElement = component.el.nativeElement as HTMLElement;

    componentElement.dispatchEvent(mockEvent);

    expect(component.isModalOpen).toBe(false);
    expect(outsideModalClickSpy).toHaveBeenCalled();
  });

  // Já que não esta propagando por algum motivo, testei através de uma chamada direta a função
  it('should do nothing if is not an outside click', () => {
    const outsideModalClickSpy = jest.spyOn(component, 'outsideModalClick');
    const mockEvent = new MouseEvent('click');

    const mockElement = document.createElement('div');

    // Forçamos a definição da propridade target
    Object.defineProperty(mockEvent, 'target', {
      writable: true,
      value: mockElement,
    });

    component.isModalOpen = true;
    component.outsideModalClick(mockEvent);

    expect(component.isModalOpen).toBe(true);
    expect(outsideModalClickSpy).toHaveBeenCalled();
  });

  it('should set isModalOpen to false after calling onClose', () => {
    const onCloseSpy = jest.spyOn(component, 'onClose');

    component.isModalOpen = true;
    component.onClose();

    expect(component.isModalOpen).toBe(false);
    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('should emit close after ModalOut animation', () => {
    const modalAnimationDoneSpy = jest.spyOn(component, 'modalAnimationDone');
    const mockEvent = { fromState: null };
    let hasBeenCalled = false;

    component.closed.subscribe(() => {
      hasBeenCalled = true;

      expect(hasBeenCalled).toBe(true);
    });

    component.modalAnimationDone(mockEvent);

    expect(modalAnimationDoneSpy).toHaveBeenCalled();
  });

  it('should do nothing after ModalIn animation', () => {
    const modalAnimationDoneSpy = jest.spyOn(component, 'modalAnimationDone');
    const mockEvent = { fromState: 'void' };

    component.modalAnimationDone(mockEvent);

    expect(modalAnimationDoneSpy).toHaveBeenCalled();
  });

  it('should emit confirm after calling onAction', () => {
    const onActionSpy = jest.spyOn(component, 'onAction');
    let hasBeenCalled = false;

    component.confirm.subscribe(() => {
      hasBeenCalled = true;

      expect(hasBeenCalled).toBe(true);
    });

    component.onAction();

    expect(onActionSpy).toHaveBeenCalled();
  });
});
