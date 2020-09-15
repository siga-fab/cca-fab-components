import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  BreadcrumbComponent,
  BreadcrumbModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Breadcrumb',
  component: BreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BreadcrumbModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <cca-common-breadcrumb>
      <cca-common-breadcrumb-item href="/">rota 1</cca-common-breadcrumb-item>
      <cca-common-breadcrumb-item href="/">rota 2</cca-common-breadcrumb-item>
      <cca-common-breadcrumb-item selected href="/">rota atual</cca-common-breadcrumb-item>
    </cca-common-breadcrumb>
  `,
});
