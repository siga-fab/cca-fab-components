import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';
import { FormSectionComponent } from './form-section.component';

import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [FormComponent, FormSectionComponent],
  imports: [CommonModule, ReactiveFormsModule, TooltipModule],
  exports: [FormComponent, FormSectionComponent, ReactiveFormsModule],
})
export class FormModule {}
