import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, IconModule],
  exports: [InputComponent],
})
export class InputModule {}
