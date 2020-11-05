import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipModule } from './tooltip.module';

@Component({
  template: `
    <div>
      <p
        id="test"
        comTooltip="This is a tooltip"
        comTooltipPosition="bottom-right"
      >
        Testing Directives is awesome!
      </p>
    </div>
  `,
})
class TestComponent {
  constructor() {}
}

describe('TooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let PARENT_ELEMENT: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [TooltipModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    PARENT_ELEMENT = fixture.debugElement.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should create tooltip element after component', () => {
    expect(PARENT_ELEMENT.children.length).toBe(3);
    expect(PARENT_ELEMENT.querySelectorAll('com-icon').length).toBeTruthy();
  });

  it('should create tooltip element with for attribute', () => {
    const TOOLTIP_INFO_ELEMENT = PARENT_ELEMENT.querySelector('label');

    expect(TOOLTIP_INFO_ELEMENT.htmlFor).toBeTruthy();
  });

  it('should have properly innerText', () => {
    const TOOLTIP_INFO_ELEMENT = PARENT_ELEMENT.querySelector('label');
    const TARGET_ELEMENT = PARENT_ELEMENT.querySelector('[comTooltip]');

    expect(TARGET_ELEMENT.getAttribute('comTooltip')).toBe(
      TOOLTIP_INFO_ELEMENT.innerText
    );
  });

  it('should be visible and opaque on mouseenter event at tooltip button', () => {
    const TOOLTIP_INFO_ELEMENT = PARENT_ELEMENT.querySelector('label');
    const TOOLTIP_BUTTON_ELEMENT = PARENT_ELEMENT.querySelector('com-icon');
    const MOCK_EVENT = new MouseEvent('mouseenter');

    TOOLTIP_BUTTON_ELEMENT.dispatchEvent(MOCK_EVENT);
    expect(TOOLTIP_INFO_ELEMENT.style.opacity).toBe('1');
    expect(TOOLTIP_INFO_ELEMENT.style.visibility).toBe('visible');
  });

  it('should be hidden and transparent on mouseleave event at tooltip button', () => {
    const TOOLTIP_INFO_ELEMENT = PARENT_ELEMENT.querySelector('label');
    const TOOLTIP_BUTTON_ELEMENT = PARENT_ELEMENT.querySelector('com-icon');
    const MOCK_EVENT = new MouseEvent('mouseleave');

    TOOLTIP_BUTTON_ELEMENT.dispatchEvent(MOCK_EVENT);
    expect(TOOLTIP_INFO_ELEMENT.style.opacity).toBe('0');
    expect(TOOLTIP_INFO_ELEMENT.style.visibility).toBe('hidden');
  });

  it('should be positioned accordin to position prop and mouse (x,y)', () => {
    const TOOLTIP_INFO_ELEMENT = PARENT_ELEMENT.querySelector('label');
    const TOOLTIP_BUTTON_ELEMENT = PARENT_ELEMENT.querySelector('com-icon');
    const TARGET_ELEMENT = PARENT_ELEMENT.querySelector('[comTooltip]');
    const MOCK_MOUSE_ENTER_EVENT = new MouseEvent('mouseenter');
    const MOCK_MOUSE_MOVE_EVENT = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 100,
    });

    TOOLTIP_BUTTON_ELEMENT.dispatchEvent(MOCK_MOUSE_ENTER_EVENT);
    TOOLTIP_BUTTON_ELEMENT.dispatchEvent(MOCK_MOUSE_MOVE_EVENT);

    expect(TARGET_ELEMENT.getAttribute('comTooltipPosition')).toBe(
      'bottom-right'
    );
    expect(TOOLTIP_INFO_ELEMENT.style.transform).toBe(
      `translate(${MOCK_MOUSE_MOVE_EVENT.clientX + 16}px, ${
        MOCK_MOUSE_MOVE_EVENT.clientY + 16
      }px)`
    );
  });
});
