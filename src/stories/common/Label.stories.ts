import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  LabelComponent,
  LabelModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common / Label',
  component: LabelComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, LabelModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <com-label>This is a Label</com-label>
  `,
});
