import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  Renderer2,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Directive({
  selector: '[ccaCommonTooltip]',
})
export class TooltipDirective implements OnInit {
  @Input('ccaCommonTooltip') text: string;

  targetElement: HTMLElement;

  tooltipElement: HTMLElement;
  tooltipComponent: ComponentRef<IconComponent>;

  tooltipInfoElement: HTMLLabelElement;

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

    this.tooltipElement = this.tooltipComponent.location.nativeElement;

    // Necessário para que os elementos estejam posicionados lado a lado
    this.applyStyle(this.targetElement, { display: 'inline-block' });

    this.applyStyle(this.tooltipElement, {
      display: 'inline-block',
      color: '#dadada',
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
      this.onMouseMove.bind(this),
      false
    );

    this.tooltipInfoElement = document.createElement('label');

    if (this.tooltipElement.id) {
      this.tooltipInfoElement.htmlFor = this.tooltipElement.id;
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
    this.tooltipInfoElement.style.transform = `translate(${clientX + 16}px, ${
      clientY + 16
    }px)`;
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
