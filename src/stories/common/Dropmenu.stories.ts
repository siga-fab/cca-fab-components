import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  DropmenuComponent,
  DropmenuModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Dropmenu',
  component: DropmenuComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DropmenuModule],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#202124' },
      ],
    },
  },
};

export const Default = () => ({
  template: `
    <cca-common-dropmenu name="lorem ipsum">
      <cca-common-dropmenu-item>This is a Dropmenu!</cca-common-dropmenu-item>
      <cca-common-dropmenu-item>This is a Dropmenu!</cca-common-dropmenu-item>
      <cca-common-dropmenu-item>This is a Dropmenu! Dropmenu!</cca-common-dropmenu-item>
    </cca-common-dropmenu>
    <cca-common-dropmenu negative name="lorem negative">
      <cca-common-dropmenu-item>This is a Dropmenu! This is a Dropmenu!</cca-common-dropmenu-item>
      <cca-common-dropmenu-item>This is a Dropmenu! Dropmenu!</cca-common-dropmenu-item>
      <cca-common-dropmenu-item>This is a Dropmenu!</cca-common-dropmenu-item>
    </cca-common-dropmenu>
  `,
});
