import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  BreadcrumbItemComponent,
  BreadcrumbModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Breadcrumb',
  component: BreadcrumbItemComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BreadcrumbModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <cca-common-breadcrumb>
      <cca-common-breadcrumb-item href="/">1st route</cca-common-breadcrumb-item>
      <cca-common-breadcrumb-item href="/">2nd route</cca-common-breadcrumb-item>
      <cca-common-breadcrumb-item selected href="/">actual route</cca-common-breadcrumb-item>
    </cca-common-breadcrumb>
  `,
});
