import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { LabelModule } from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Label',
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
