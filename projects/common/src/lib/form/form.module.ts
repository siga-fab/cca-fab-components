import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { FormSectionComponent } from './form-section.component';

@NgModule({
  declarations: [FormComponent, FormSectionComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormComponent, FormSectionComponent, ReactiveFormsModule],
})
export class FormModule {}
