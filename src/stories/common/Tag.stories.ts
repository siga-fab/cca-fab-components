import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  TagComponent,
  TagModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Tag',
  component: TagComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TagModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <cca-common-tag>This is a Tag!</cca-common-tag>
  `,
});

export const Clickable = () => ({
  template: `
    <cca-common-tag clickable>This is a clickable Tag!</cca-common-tag>
  `,
});

export const Selected = () => ({
  template: `
    <cca-common-tag [selected]="true">This is a selected Tag!</cca-common-tag>
  `,
});
