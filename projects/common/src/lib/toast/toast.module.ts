import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, IconModule, ButtonModule, NoopAnimationsModule],
  exports: [ToastComponent],
})
export class ToastModule {}
