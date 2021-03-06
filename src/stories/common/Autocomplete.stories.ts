import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import {
  AutocompleteModule,
  AutocompleteComponent,
} from '../../../projects/common/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Common / Autocomplete',
  component: AutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, AutocompleteModule, BrowserAnimationsModule],
    }),
  ],
};

export const Default = () => {
  const optionsConfig = [
    'Amazon',
    'Alphabet',
    'BBC',
    'Google',
    'Random',
    'Stuff',
    'Apple',
    'Right',
    { name: 'Sample', value: 1337 },
    'Ninx',
  ];

  const options = [...optionsConfig];

  const filter = (value: any) =>
    optionsConfig.filter((option) =>
      typeof option === 'string'
        ? option.toLowerCase().startsWith(value.toLowerCase())
        : option.name.toLowerCase().startsWith(value.toLowerCase())
    );

  const update = (value: any[]) => {
    options.splice(0, options.length, ...value);
    return options;
  };

  return {
    props: {
      filter: (value) => action('changed')(update(filter(value))),
      options,
      confirmed: action('confirmed'),
      label: 'Autocomplete',
      placeholder: 'Digite algo',
    },
    template: `
      <com-autocomplete
        enableConfirmOnInexistentValue
        autoActiveFirstOption
        (changed)="filter($event)"
        (confirmed)="confirmed($event)"
        [label]="label"
        [placeholder]="placeholder"
        [options]="options"></com-autocomplete>
    `,
  };
};
