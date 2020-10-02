import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';
import { TextareaModule } from './textarea.module';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TextareaModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // exibe qntChar
  it('should change qntChar value after calling exibeQntChar', () => {
    const exibeQntCharSpy = jest.spyOn(component, 'exibeQntChar');
    const NEW_VALUE = 'testing';

    component.exibeQntChar(NEW_VALUE);

    expect(component.qntChar).toBe(NEW_VALUE.length);
    expect(exibeQntCharSpy).toHaveBeenCalled();
  });

  // Valor Máximo de caracteres
  it('should respect max property limit on isFocused', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');
    const INPUT_ELEMENT = component.textarea.nativeElement;
    const MAX_VALUE = 5;

    component.maxlength = MAX_VALUE;
    component.value = INPUT_ELEMENT.value = '5';

    component.confirm.subscribe((res) => {
      expect(res).toBe(String(MAX_VALUE));
    });

    component.isFocused(false);
    expect(isFocusedSpy).toHaveBeenCalled();
  });

  // LABEL com foco
  it('should style label when focused', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');

    component.label = 'Test';

    const LABEL_ELEMENT: HTMLLabelElement =
      component.textarea.nativeElement.parentElement;

    component.confirm.subscribe((res) => {
      expect(LABEL_ELEMENT.classList.contains('focused')).toBe(true);
    });

    component.isFocused(true);

    expect(isFocusedSpy).toHaveBeenCalled();
  });

  // Atribui placeholder
  it('should assign placeholder', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');

    component.placeholder = 'testing';

    component.isFocused(true);

    expect(component.textarea.nativeElement.placeholder).toBe(
      component.placeholder
    );
    expect(isFocusedSpy).toHaveBeenCalled();
  });

  // LABEL sem foco
  it('should style label when not focused', () => {
    const isFocusedSpy = jest.spyOn(component, 'isFocused');

    component.label = 'Test';

    const LABEL_ELEMENT: HTMLLabelElement =
      component.textarea.nativeElement.parentElement;

    component.confirm.subscribe((res) => {
      expect(LABEL_ELEMENT.classList.contains('colored')).toBe(true);
    });

    component.isFocused(true);

    expect(isFocusedSpy).toHaveBeenCalled();
  });

  // Chama updateValue e atribui o valor recebido a value
  it('should call updateValue and assign to value', () => {
    const updateValueSpy = jest.spyOn(component, 'updateValue');
    const MOCK_EVENT = new Event('change');
    const MOCK_TEXTAREA = document.createElement('textarea');

    MOCK_TEXTAREA.addEventListener('change', component.updateValue);

    MOCK_TEXTAREA.dispatchEvent(MOCK_EVENT);

    expect(updateValueSpy).toHaveBeenCalled();
    expect(component.value).toBe(MOCK_TEXTAREA.value);
  });
});
