import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { AutocompleteModule } from '../../../projects/common/src/lib/autocomplete/autocomplete.module';

export default {
  title: 'Common | Autocomplete',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, AutocompleteModule],
    }),
  ],
};

export const Default = () => ({
  props: {
    click: action('Closed'),
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
  },
  template: `
    <com-autocomplete [options]="options"></com-autocomplete>
  `,
});
