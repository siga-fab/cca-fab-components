import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, InputModule],
  exports: [SelectComponent],
})
export class SelectModule {}
