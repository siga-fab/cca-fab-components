import { action } from '@storybook/addon-actions';
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
  props: {
    checkbox: true,
    handleChange: action('changed'),
  },
  template: `
    <span>{{ checkbox }}</span>
    <cca-common-checkbox value="checkbox 1" [(ngModel)]="checkbox">This is a checkbox!</cca-common-checkbox>
    <cca-common-checkbox (changed)="handleChange($event)">This is a checkbox!</cca-common-checkbox>
    <cca-common-checkbox disabled="true">This is a checkbox!</cca-common-checkbox>
  `,
});
