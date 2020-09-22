import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

import {
  RadioModule,
  LabelModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Radio',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RadioModule, LabelModule],
    }),
  ],
};

export const Default = () => ({
  props: {
    handleChange: action('changed'),
    radioVertical: 'option 2',
    radioHorizontal: 'option 5',
  },
  template: `
    <cca-common-label>{{ radioVertical }}</cca-common-label>
    <cca-common-radio-group [(ngModel)]="radioVertical" (changed)="handleChange($event)">
      <cca-common-radio value="option 1">option 1</cca-common-radio>
      <cca-common-radio value="option 2">option 2</cca-common-radio>
      <cca-common-radio [disabled]="true">option 3</cca-common-radio>
    </cca-common-radio-group>
    <cca-common-label>{{ radioHorizontal }}</cca-common-label>
    <cca-common-radio-group horizontal [(ngModel)]="radioHorizontal" (changed)="handleChange($event)">
      <cca-common-radio checked="true" value="option 4">option 4</cca-common-radio>
      <cca-common-radio value="option 5">option 5</cca-common-radio>
      <cca-common-radio [disabled]="true">option 6</cca-common-radio>
    </cca-common-radio-group>
  `,
});
