import {
  TextareaModule,
  IconModule,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Common / Textarea',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        TextareaModule,
        IconModule,
        BrowserAnimationsModule,
      ],
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
  <div>
    <com-textarea maxlength="100" placeholder="Digite o Texto" label="Campo de Texto" helper="Helper text" cols="100" rows="1"></com-textarea>
  </div>
  `,
});
