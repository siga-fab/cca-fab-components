import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropmenuComponent } from './dropmenu.component';

import { IconModule } from '../icon/icon.module';
import { RouterModule } from '@angular/router';

describe('DropmenuComponent', () => {
  let component: DropmenuComponent;
  let fixture: ComponentFixture<DropmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropmenuComponent],
      imports: [IconModule],
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
