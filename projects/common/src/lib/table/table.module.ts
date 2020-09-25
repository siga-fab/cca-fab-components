import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { InputModule } from '../input/input.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, IconModule, InputModule],
  exports: [TableComponent],
})
export class TableModule {}
