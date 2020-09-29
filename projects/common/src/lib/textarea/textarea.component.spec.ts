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

  it('should change qntChar value after calling exibeQntChar', () => {
    const exibeQntCharSpy = jest.spyOn(component, 'exibeQntChar');
    const NEW_VALUE = 'testing';

    component.exibeQntChar(NEW_VALUE);

    expect(component.qntChar).toBe(NEW_VALUE.length);
    expect(exibeQntCharSpy).toHaveBeenCalled();
  });
});
