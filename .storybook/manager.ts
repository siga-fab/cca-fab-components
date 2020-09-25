import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',

    brandTitle: 'cca fab components angular',
    brandUrl: 'https://github.com/siga-fab/cca-fab-components',
  }),
});
