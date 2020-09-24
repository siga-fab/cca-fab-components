import { action } from '@storybook/addon-actions';
import {
  InputComponent,
  InputModule,
  IconModule,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

export default {
  title: 'Common | Input',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, InputModule, IconModule],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: '#fafafa' },
        { name: 'dark', value: '#202124' },
      ],
    },
  },
};

export const Default = () => ({
  props: {
    console: console,
  },
  template: `
  <div style="background: #fafafa">
    <cca-common-input placeholder="Digite seu nome" label="Campo de Texto"></cca-common-input>
  </div>
  `,
});

export const Number = () => ({
  template: `<div style="width: 10rem">
    <cca-common-input step="0.1" min="0.5" max="0.8" label="testando" type="number" style="margin-top: 2rem"></cca-common-input>
  </div>`,
});

export const Date = () => ({
  template: `
  <div style="background: #fff;">
    <cca-common-input label="Data" type="date" min="2020-05-20"></cca-common-input>
  </div>
  `,
});
