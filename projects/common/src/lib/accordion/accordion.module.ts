import { IconModule } from './../icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './accordion-item.component';

@NgModule({
  declarations: [AccordionComponent, AccordionItemComponent],
  imports: [CommonModule, IconModule],
  exports: [AccordionComponent, AccordionItemComponent],
})
export class AccordionModule {}
