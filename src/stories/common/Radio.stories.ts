import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

import { RadioModule } from '../../../projects/common/src/public-api';

export default {
  title: 'Common / Radio',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RadioModule],
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
    <span>{{ radioVertical }}</span>
    <com-radio-group [(ngModel)]="radioVertical" (changed)="handleChange($event)">
      <com-radio value="option 1">option 1</com-radio>
      <com-radio value="option 2">option 2</com-radio>
      <com-radio [disabled]="true">option 3</com-radio>
    </com-radio-group>
    <span>{{ radioHorizontal }}</span>
    <com-radio-group horizontal [(ngModel)]="radioHorizontal" (changed)="handleChange($event)">
      <com-radio checked="true" value="option 4">option 4</com-radio>
      <com-radio value="option 5">option 5</com-radio>
      <com-radio [disabled]="true">option 6</com-radio>
    </com-radio-group>
  `,
});
