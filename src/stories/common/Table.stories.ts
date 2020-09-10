import { action } from '@storybook/addon-actions';
import { TableComponent } from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Table',
  component: TableComponent,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: '#fafafa' },
        { name: 'dark', value: '#202124' },
      ],
    },
  },
};

export const Default = () => ({
  component: TableComponent,
});
