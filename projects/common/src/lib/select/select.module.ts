import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { InputModule } from '../input/input.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, InputModule, BrowserAnimationsModule],
  exports: [SelectComponent],
})
export class SelectModule {}
