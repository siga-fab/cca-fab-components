import {
  TextareaModule,
  IconModule,
} from '../../../projects/common/src/public-api';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

export default {
  title: 'Common | Textarea',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TextareaModule, IconModule],
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
  <div style="background: #fafafa;">
    <com-textarea maxlength="100" placeholder="Digite o Texto" label="Campo de Texto" helper="Optional helper text" cols="100" rows="1"></com-textarea>
  </div>
  `,
});
