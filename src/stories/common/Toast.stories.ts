import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

import {
  ToastComponent,
  ToastModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common / Toast',
  component: ToastComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ToastModule],
    }),
  ],
};

export const Default = () => ({
  props: {
    click: action('Closed'),
  },
  template: `
    <com-toast (closed)="click($event)">This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</com-toast>
    <com-toast (closed)="click($event)" success>This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk adsdfsadf sdafs daf sdf asd fas df asdf asd fas f asdf fghfdhfdhfhfg!</com-toast>
    <com-toast (closed)="click($event)" alert>This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</com-toast>
    <com-toast (closed)="click($event)" error>This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</com-toast>
  `,
});
