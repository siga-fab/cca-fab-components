import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  CardComponent,
  CardModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CardModule],
    }),
  ],
};

export const Styles = () => ({
  template: `
    <div style="width: 30rem; height: 40rem;">
      <cca-common-card>
        <span>This is a card!</span>
      </cca-common-card>
    </div>
  `,
});
