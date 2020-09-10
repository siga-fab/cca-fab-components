import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { ButtonModule, IconModule } from 'common';

export default {
  title: 'Common | Button',
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
