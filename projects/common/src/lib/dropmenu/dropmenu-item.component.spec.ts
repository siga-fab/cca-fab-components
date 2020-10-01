import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropmenuItemComponent } from './dropmenu-item.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DropmenuItemComponent', () => {
  let component: DropmenuItemComponent;
  let fixture: ComponentFixture<DropmenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropmenuItemComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropmenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
