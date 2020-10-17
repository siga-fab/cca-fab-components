import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

import {
  ToastComponent,
  ToastModule,
} from '../../../projects/common/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Common / Toast',
  component: ToastComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ToastModule, BrowserAnimationsModule],
    }),
  ],
};

export const Default = () => ({
  props: {
    click: action('Closed'),
  },
  template: `
    <com-toast (closed)="click($event)" style="margin: 1rem;">This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</com-toast>
    <com-toast (closed)="click($event)" toastStyle="success" style="margin: 1rem;">This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk adsdfsadf!</com-toast>
    <com-toast (closed)="click($event)" toastStyle="alert" style="margin: 1rem;">This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</com-toast>
    <com-toast (closed)="click($event)" toastStyle="error" style="margin: 1rem;">This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</com-toast>
  `,
});
