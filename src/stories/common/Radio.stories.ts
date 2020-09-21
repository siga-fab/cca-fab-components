import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

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
  props: {
    handleChange: action('changed'),
  },
  template: `
    <cca-common-radio-group (changed)="handleChange($event)">
      <cca-common-radio checked="true" value="option 1">option 1</cca-common-radio>
      <cca-common-radio value="option 2">option 2</cca-common-radio>
      <cca-common-radio [disabled]="true">option 3</cca-common-radio>
    </cca-common-radio-group>
    <cca-common-radio-group horizontal (changed)="handleChange($event)">
      <cca-common-radio checked="true" value="option 4">option 4</cca-common-radio>
      <cca-common-radio value="option 5">option 5</cca-common-radio>
      <cca-common-radio [disabled]="true">option 6</cca-common-radio>
    </cca-common-radio-group>
  `,
});
