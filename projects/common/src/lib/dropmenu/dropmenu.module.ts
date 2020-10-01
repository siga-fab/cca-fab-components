import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropmenuComponent } from './dropmenu.component';
import { DropmenuItemComponent } from './dropmenu-item.component';

import { IconModule } from '../icon/icon.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DropmenuComponent, DropmenuItemComponent],
  imports: [CommonModule, IconModule, RouterModule],
  exports: [DropmenuComponent, DropmenuItemComponent],
})
export class DropmenuModule {}
