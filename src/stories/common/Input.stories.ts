import {
  InputModule,
  IconModule,
  InputComponent,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Common / Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, InputModule, IconModule, BrowserAnimationsModule],
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

export const Default = () => {
  let props = {
    showHelperText: { value: true },
    toggleHelper: () => {},
  };

  props.toggleHelper = () => {
    props.showHelperText.value = !props.showHelperText.value;
  };

  return {
    props: props,
    template: `
    <com-input [helper]=" showHelperText.value ? 'Helper text' : null" label="Text Input" placeholder="Digite seu nome" ></com-input>
    <button style="display: block; position: absolute; top: 100px;" (click)="toggleHelper()">Trigger Helper Text Animation</button>
    `,
  };
};

export const Number = () => ({
  template: `<div>
    <com-input label="Number Input" type="number"></com-input>
  </div>`,
});

export const Date = () => ({
  template: `
  <div>
    <com-input label="Data" type="date" min="2020-05-20"></com-input>
  </div>
  `,
});
