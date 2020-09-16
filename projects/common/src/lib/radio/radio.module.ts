import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonComponent } from './radio-button.component';

@NgModule({
  declarations: [RadioButtonGroupComponent, RadioButtonComponent],
  imports: [CommonModule],
})
export class RadioModule {}
