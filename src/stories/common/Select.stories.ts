import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { SelectModule } from '../../../projects/common/src/lib/select/select.module';

export default {
  title: 'Common | Select',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SelectModule],
    }),
  ],
};

export const Default = () => ({
  props: {
    click: action('Closed'),
  },
  template: `
    <com-select></com-select>
  `,
});
