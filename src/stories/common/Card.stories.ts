import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  CardModule,
  CardComponent,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common / Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CardModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <div style="width: 30rem; height: 40rem;">
      <com-card>
        <span>This is a card!</span>
      </com-card>
    </div>
  `,
});
