import { RouterTestingModule } from '@angular/router/testing';
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
      imports: [
        CommonModule,
        BreadcrumbModule,
        RouterTestingModule.withRoutes([]),
      ],
    }),
  ],
};

export const Default = () => ({
  template: `
    <com-breadcrumb>
      <com-breadcrumb-item>1st route</com-breadcrumb-item>
      <com-breadcrumb-item>2nd route</com-breadcrumb-item>
      <com-breadcrumb-item [active]="true">actual route</com-breadcrumb-item>
    </com-breadcrumb>
  `,
});
