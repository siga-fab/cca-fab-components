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
      <com-autocomplete highlightFirst
        (changed)="filter($event)"
        (confirmed)="confirmed($event)"
        [label]="label"
        [placeholder]="placeholder"
        [options]="options"></com-autocomplete>
    `,
  };
};
