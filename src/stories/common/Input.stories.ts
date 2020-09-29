import {
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
  template: `
  <div style="background: #fafafa">
    <com-input placeholder="Digite seu nome" label="Campo de Texto"></com-input>
  </div>
  `,
});

export const Number = () => ({
  template: `<div>
    <com-input label="Number Input" type="number"></com-input>
  </div>`,
});

export const Date = () => ({
  template: `
  <div style="background: #fff;">
    <com-input label="Data" type="date" min="2020-05-20"></com-input>
  </div>
  `,
});
