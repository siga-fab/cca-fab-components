import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [TagComponent],
  imports: [CommonModule, IconModule, ButtonModule],
  exports: [TagComponent],
})
export class TagModule {}
