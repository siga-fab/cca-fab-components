import { Component } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

import {
  ButtonModule,
  IconModule,
  ButtonComponent,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule, IconModule],
      declarations: [],
    }),
  ],
};

export const Primary = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <cca-common-button (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
      <ng-container slot="text">nova</ng-container>
    </cca-common-button>
  `,
});
