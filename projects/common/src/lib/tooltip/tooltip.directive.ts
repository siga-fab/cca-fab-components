import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Directive({
  selector: '[ccaCommonTooltip]',
})
export class TooltipDirective implements OnInit {
  @Input('ccaCommonTooltip') public text: string;

  /* tslint:disable-next-line:no-input-rename */
  @Input('tooltipPosition') public tooltipPosition: string;

  /* tslint:disable-next-line:no-input-rename */
  @Input('tooltipSize') public tooltipSize: number;

  targetElement: HTMLElement;

  tooltipElement: HTMLElement;
  tooltipComponent: ComponentRef<IconComponent>;

  tooltipInfoElement: HTMLLabelElement;

  private DEFAULT_POSITION = 'bottom-right';
  private getX: (x: number) => {};
  private getY: (y: number) => {};

  positionMap = {
    'bottom-right': {
      x: (x: number) => x + 16,
      y: (y: number) => y + 16,
    },

    'bottom-left': {
      x: (x: number) => x - 16 - this.tooltipInfoElement.clientWidth,
      y: (y: number) => y + 16,
    },

    'top-left': {
      x: (x: number) => x - 16 - this.tooltipInfoElement.clientWidth,
      y: (y: number) => y - 16 - this.tooltipInfoElement.clientHeight,
    },

    'top-right': {
      x: (x: number) => x + 16,
      y: (y: number) => y - 16 - this.tooltipInfoElement.clientHeight,
    },
  };

  constructor(
    private vc: ViewContainerRef,
    private targetElementRef: ElementRef,
    private renderer: Renderer2,
    private factory: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    // Inicializa fábrica de componentes para criar ícone
    const factory = this.factory.resolveComponentFactory(IconComponent);
    // Salva referência do elemento pai do elemento que está usando a diretiva
    const { parentElement } = this.vc.element.nativeElement;
    // Salva referência do elemento alvo
    this.targetElement = this.targetElementRef.nativeElement;
    // Cria componente de ícone
    this.tooltipComponent = this.vc.createComponent(factory, 0, null, [
      [document.createTextNode('help_outline')],
    ]);
    this.tooltipComponent.instance.size = this.tooltipSize;

    this.tooltipElement = this.tooltipComponent.location.nativeElement;

    // Necessário para que os elementos estejam posicionados lado a lado
    this.applyStyle(this.targetElement, { display: 'inline-block' });

    this.applyStyle(this.tooltipElement, {
      display: 'inline-block',
      color: '#80868d',
      cursor: 'pointer',
      marginLeft: '.5rem',
    });

    this.tooltipElement.addEventListener(
      'mouseenter',
      this.onMouseOver.bind(this)
    );
    this.tooltipElement.addEventListener(
      'mouseleave',
      this.onMouseLeave.bind(this)
    );
    this.tooltipElement.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this)
    );

    this.tooltipInfoElement = document.createElement('label');

    if (this.targetElement.id) {
      this.tooltipInfoElement.htmlFor = this.targetElement.id;
    }

    this.applyStyle(this.tooltipInfoElement, {
      background: '#202124', // black - colors.scss
      borderRadius: '5px',
      color: '#fff',
      fontFamily: 'Cabin',
      fontSize: '1.2rem',
      padding: '1.2rem 1.5rem',
      position: 'fixed',
      left: '0',
      top: '0',
      transition: 'opacity ease-in-out .15s, visibility .15s',
      opacity: '0',
      visibility: 'hidden',
      zIndex: '99',
      maxWidth: '256px',
      textAlign: 'center',
    });

    this.tooltipInfoElement.innerText = this.text;

    this.getX = this.positionMap[
      this.tooltipPosition || this.DEFAULT_POSITION
    ].x;
    this.getY = this.positionMap[
      this.tooltipPosition || this.DEFAULT_POSITION
    ].y;

    this.renderer.appendChild(parentElement, this.tooltipInfoElement);
  }

  onMouseOver(): void {
    this.applyStyle(this.tooltipInfoElement, {
      opacity: '1',
      visibility: 'visible',
    });
  }

  onMouseMove(event: MouseEvent): void {
    const { clientX, clientY } = event;

    this.tooltipInfoElement.style.transform = `translate(${this.getX(
      clientX
    )}px, ${this.getY(clientY)}px)`;
  }

  onMouseLeave(): void {
    this.applyStyle(this.tooltipInfoElement, {
      opacity: '0',
      visibility: 'hidden',
    });
  }

  private applyStyle(element: HTMLElement, styleObj: object) {
    /* tslint:disable */
    for (const style in styleObj) {
      element.style[style] = styleObj[style];
    }
    /* tslint:enable
     */
  }
}
