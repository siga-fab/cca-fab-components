import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TextareaComponent],
  imports: [CommonModule, IconModule],
  exports: [TextareaComponent],
})
export class TextareaModule {}
