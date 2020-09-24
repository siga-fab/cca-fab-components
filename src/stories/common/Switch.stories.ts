import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { SwitchModule } from '../../../projects/common/src/lib/switch/switch.module';

export default {
  title: 'Common | Switch',
  decorators: [
    moduleMetadata({
      imports: [SwitchModule],
    }),
  ],
};

export const Default = () => ({
  template: `
  <cca-common-switch></cca-common-switch>`,
});
