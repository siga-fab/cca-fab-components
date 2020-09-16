import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { RadioModule } from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Radio',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RadioModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <cca-common-radio-button-group>
      <cca-common-radio-button></cca-common-radio-button>
    </cca-common-radio-button-group>
  `,
});
