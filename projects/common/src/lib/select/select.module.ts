import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { InputModule } from '../input/input.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, InputModule, NoopAnimationsModule],
  exports: [SelectComponent],
})
export class SelectModule {}
