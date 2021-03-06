import { SelectComponent } from './../../../projects/common/src/lib/select/select.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { SelectModule } from 'projects/common/src/lib/select/select.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Common / Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        SelectModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
    }),
  ],
};

export const Default = () => ({
  props: {
    opened: action('opened'),
    closed: action('closed'),
    changed: action('changed'),
    options: [
      'Opção 1',
      'Opção 2',
      'Opção 3',
      'Opção 4',
      'Opção 5',
      'Opção 6',
      'Opção 7',
      'Opção 8',
      { name: 'Opção 9', value: 1337 },
      'Opção 10',
    ],
    label: 'Select',
    placeholder: 'Escolha algo',
  },
  template: `
    <com-select
      (changed)="changed($event)"
      (opened)="opened()"
      (closed)="closed()"
      [options]="options"
      [label]="label"
      [placeholder]="placeholder"
    >
    </com-select>
  `,
});
