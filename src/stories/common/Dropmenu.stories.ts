import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  DropmenuComponent,
  DropmenuModule,
} from '../../../projects/common/src/public-api';

import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'Common / Dropmenu',
  component: DropmenuComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DropmenuModule,
        RouterTestingModule.withRoutes([]),
      ],
    }),
  ],
  parameters: {
    docs: { iframeHeight: 250 },
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
    <com-dropmenu name="lorem ipsum">
      <com-dropmenu-item>This is a Dropmenu!</com-dropmenu-item>
      <com-dropmenu-item>This is a Dropmenu!</com-dropmenu-item>
      <com-dropmenu-item>This is a Dropmenu! Dropmenu!</com-dropmenu-item>
    </com-dropmenu>
    <com-dropmenu negative name="lorem negative">
      <com-dropmenu-item>This is a Dropmenu! This is a Dropmenu!</com-dropmenu-item>
      <com-dropmenu-item>This is a Dropmenu! Dropmenu!</com-dropmenu-item>
      <com-dropmenu-item>This is a Dropmenu!</com-dropmenu-item>
    </com-dropmenu>
  `,
});
