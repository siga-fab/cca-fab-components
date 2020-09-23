import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';
import { FormSectionComponent } from './form-section.component';

import { TooltipModule } from '../tooltip/tooltip.module';
import { FieldsetComponent } from './fieldset.component';

@NgModule({
  declarations: [FormComponent, FormSectionComponent, FieldsetComponent],
  imports: [CommonModule, ReactiveFormsModule, TooltipModule],
  exports: [
    FormComponent,
    FormSectionComponent,
    FieldsetComponent,
    ReactiveFormsModule,
  ],
})
export class FormModule {}
