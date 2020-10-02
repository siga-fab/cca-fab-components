import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropmenuComponent } from './dropmenu.component';

import { IconModule } from '../icon/icon.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('DropmenuComponent', () => {
  let component: DropmenuComponent;
  let fixture: ComponentFixture<DropmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropmenuComponent],
      imports: [IconModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
