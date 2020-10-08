import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { InputModule } from '../input/input.module';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, InputModule],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
