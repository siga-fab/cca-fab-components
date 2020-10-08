import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { InputModule } from '../input/input.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, InputModule, NoopAnimationsModule],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
