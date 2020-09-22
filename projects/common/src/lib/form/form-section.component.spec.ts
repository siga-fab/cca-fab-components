import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSectionComponent } from './form-section.component';
import { TooltipModule } from './../tooltip/tooltip.module';

describe('FormSectionComponent', () => {
  let component: FormSectionComponent;
  let fixture: ComponentFixture<FormSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSectionComponent],
      imports: [TooltipModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
