import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Checkbox',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CheckboxModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <cca-common-checkbox></cca-common-checkbox>
  `,
});
