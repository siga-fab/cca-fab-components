import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ToastModule } from '../../../projects/common/src/public-api';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Common | Toast',
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
    <cca-common-toast (closed)="click($event)">This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</cca-common-toast>
    <cca-common-toast (closed)="click($event)" success>This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk adsdfsadf sdafs daf sdf asd fas df asdf asd fas f asdf fghfdhfdhfhfg!</cca-common-toast>
    <cca-common-toast (closed)="click($event)" alert>This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</cca-common-toast>
    <cca-common-toast (closed)="click($event)" error>This is a toast kjsdfgjkan dnhfk jaskdjfn kjasdfjk!</cca-common-toast>
  `,
});
