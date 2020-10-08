import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CardModule } from '../card/card.module';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, CardModule, IconModule, ButtonModule],
  exports: [ModalComponent],
})
export class ModalModule {}
