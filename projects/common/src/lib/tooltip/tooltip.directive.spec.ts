import {
  ViewContainerRef,
  ElementRef,
  Renderer2,
  ComponentFactoryResolver,
  Type,
  ComponentFactory,
} from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
  it('should create an instance', () => {
    const renderer2: Renderer2 = new TestRenderer2();
    const factory: ComponentFactoryResolver = new TestComponentFactoryResolver();

    const directive = new TooltipDirective(
      new TestViewContainerRef(),
      new ElementRef(document),
      renderer2,
      factory
    );
    expect(directive).toBeTruthy();
  });
});

class TestRenderer2 extends Renderer2 {
  addClass() {
    throw new Error('Method not implemented.');
  }

  appendChild() {
    throw new Error('Method not implemented.');
  }

  createComment() {
    throw new Error('Method not implemented.');
  }

  createElement() {
    throw new Error('Method not implemented.');
  }

  createText() {
    throw new Error('Method not implemented.');
  }

  get data() {
    return {};
  }

  destroy() {
    throw new Error('Method not implemented.');
  }

  insertBefore() {
    throw new Error('Method not implemented.');
  }

  listen(target, eventName: string, callback: (event: any) => void | boolean) {
    throw new Error('Method not implemented.');
    return () => {};
  }

  nextSibling() {
    throw new Error('Method not implemented.');
  }

  parentNode() {
    throw new Error('Method not implemented.');
  }

  removeAttribute() {
    throw new Error('Method not implemented.');
  }

  removeChild() {
    throw new Error('Method not implemented.');
  }

  removeClass() {
    throw new Error('Method not implemented.');
  }

  removeStyle() {
    throw new Error('Method not implemented.');
  }

  selectRootElement() {
    throw new Error('Method not implemented.');
  }

  setAttribute() {
    throw new Error('Method not implemented.');
  }

  setProperty() {
    throw new Error('Method not implemented.');
  }

  setStyle() {
    throw new Error('Method not implemented.');
  }

  setValue() {
    throw new Error('Method not implemented.');
  }
}

class TestComponentFactoryResolver extends ComponentFactoryResolver {
  resolveComponentFactory<IconComponent>(
    component: Type<IconComponent>
  ): ComponentFactory<IconComponent> {
    throw new Error('Method not implemented.');
    return;
  }
}

class TestViewContainerRef extends ViewContainerRef {
  get element(): import('@angular/core').ElementRef<any> {
    throw new Error('Method not implemented.');
  }
  get injector(): import('@angular/core').Injector {
    throw new Error('Method not implemented.');
  }
  get parentInjector(): import('@angular/core').Injector {
    throw new Error('Method not implemented.');
  }
  clear(): void {
    throw new Error('Method not implemented.');
  }
  get(index: number): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }
  get length(): number {
    throw new Error('Method not implemented.');
  }
  createEmbeddedView<C>(
    templateRef: import('@angular/core').TemplateRef<C>,
    context?: C,
    index?: number
  ): import('@angular/core').EmbeddedViewRef<C> {
    throw new Error('Method not implemented.');
  }
  createComponent<C>(
    componentFactory: import('@angular/core').ComponentFactory<C>,
    index?: number,
    injector?: import('@angular/core').Injector,
    projectableNodes?: any[][],
    ngModule?: import('@angular/core').NgModuleRef<any>
  ): import('@angular/core').ComponentRef<C> {
    throw new Error('Method not implemented.');
  }
  insert(
    viewRef: import('@angular/core').ViewRef,
    index?: number
  ): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }
  move(
    viewRef: import('@angular/core').ViewRef,
    currentIndex: number
  ): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }
  indexOf(viewRef: import('@angular/core').ViewRef): number {
    throw new Error('Method not implemented.');
  }
  remove(index?: number): void {
    throw new Error('Method not implemented.');
  }
  detach(index?: number): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }
}
