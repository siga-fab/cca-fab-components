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
    <div style="width: 30rem; margin: 1rem;">
      <com-card >
        <span>This is a card!</span>
      </com-card>
    </div>
    <div style="width: 30rem; margin: 1rem;">
      <com-card headerTitle="This is a card title">
        <span>This is a card!</span>
      </com-card>
    </div>
    <div style="width: 30rem; margin: 1rem;">
      <com-card>
        <div slot="header">This is a header</div>
        <span>This is a card!</span>
        <div slot="footer">This is a footer</div>
      </com-card>
    </div>
  `,
});
