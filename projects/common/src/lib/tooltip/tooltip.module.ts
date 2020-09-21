import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { IconComponent } from '../icon/icon.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TooltipDirective],
  imports: [CommonModule, IconModule],
  exports: [TooltipDirective],
  entryComponents: [IconComponent],
})
export class TooltipModule {}
