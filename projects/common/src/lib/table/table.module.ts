import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { InputModule } from '../input/input.module';
import { IconModule } from '../icon/icon.module';

import { NgTemplateNameDirective } from './ng-template-name.directive';

@NgModule({
  declarations: [TableComponent, NgTemplateNameDirective],
  imports: [CommonModule, IconModule, InputModule],
  exports: [TableComponent, NgTemplateNameDirective],
})
export class TableModule {}
