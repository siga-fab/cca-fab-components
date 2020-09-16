import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { IconComponent } from '../icon/icon.component';

@NgModule({
  declarations: [TooltipDirective],
  imports: [CommonModule],
  exports: [TooltipDirective],
})
export class TooltipModule {}
