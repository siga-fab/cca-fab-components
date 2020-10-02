import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { InputModule } from '../input/input.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, InputModule, BrowserAnimationsModule],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
