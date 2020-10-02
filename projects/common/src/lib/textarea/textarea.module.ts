import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TextareaComponent],
  imports: [CommonModule, IconModule, BrowserAnimationsModule],
  exports: [TextareaComponent],
})
export class TextareaModule {}
