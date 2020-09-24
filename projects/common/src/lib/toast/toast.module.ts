import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, IconModule, ButtonModule, BrowserAnimationsModule],
  exports: [ToastComponent],
})
export class ToastModule {}
