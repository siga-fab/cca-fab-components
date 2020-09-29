import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  BreadcrumbModule,
  BreadcrumbItemComponent,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common / Breadcrumb',
  component: BreadcrumbItemComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BreadcrumbModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <com-breadcrumb>
      <com-breadcrumb-item href="/">1st route</com-breadcrumb-item>
      <com-breadcrumb-item href="/">2nd route</com-breadcrumb-item>
      <com-breadcrumb-item selected href="/">actual route</com-breadcrumb-item>
    </com-breadcrumb>
  `,
});
