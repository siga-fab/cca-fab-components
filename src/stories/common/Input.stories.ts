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
  component: InputComponent,
});
