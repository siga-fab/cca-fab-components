import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, IconModule, ButtonModule],
  exports: [ToastComponent],
})
export class ToastModule {}
