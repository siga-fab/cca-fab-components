import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropmenuComponent } from './dropmenu.component';
import { DropmenuItemComponent } from './dropmenu-item/dropmenu-item.component';

import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [DropmenuComponent, DropmenuItemComponent],
  imports: [CommonModule, IconModule],
  exports: [DropmenuComponent, DropmenuItemComponent],
})
export class DropmenuModule {}
