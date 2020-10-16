import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [FileUploaderComponent],
  imports: [CommonModule, IconModule, ButtonModule],
  exports: [FileUploaderComponent],
})
export class FileUploaderModule {}
