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
    <com-checkbox value="checkbox 1" [(ngModel)]="checkbox">This is a checkbox!</com-checkbox>
    <com-checkbox (changed)="handleChange($event)">This is a checkbox!</com-checkbox>
    <com-checkbox disabled="true">This is a checkbox!</com-checkbox>
  `,
});

export const Switch = () => ({
  props: {
    checkbox: true,
    handleChange: action('changed'),
  },
  template: `
    <span>{{ checkbox }}</span>
    <com-checkbox switch value="checkbox 1" [(ngModel)]="checkbox"></com-checkbox>
    <com-checkbox switch (changed)="handleChange($event)"></com-checkbox>
    <com-checkbox switch disabled="true"></com-checkbox>
  `,
});
