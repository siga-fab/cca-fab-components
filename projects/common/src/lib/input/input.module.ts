import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './input.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, IconModule, BrowserAnimationsModule],
  exports: [InputComponent],
})
export class InputModule {}
