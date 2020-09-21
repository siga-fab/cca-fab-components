import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { CardModule } from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Card',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CardModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <div style="width: 30rem; height: 40rem;">
      <cca-common-card>
        <span>This is a card!</span>
      </cca-common-card>
    </div>
  `,
});
