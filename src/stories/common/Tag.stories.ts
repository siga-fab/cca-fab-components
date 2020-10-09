import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  TagComponent,
  TagModule,
} from '../../../projects/common/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Common / Tag',
  component: TagComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TagModule, BrowserAnimationsModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <div style="margin-bottom: 1.5rem">
      <com-tag>This is a Tag!</com-tag>
    </div>
    <div style="margin-bottom: 1.5rem">
      <com-tag primary>This is a Tag!</com-tag>
    </div>
    <div>
      <com-tag secondary>This is a Tag!</com-tag>
    </div>
  `,
});

export const Clickable = () => ({
  template: `
    <com-tag clickable>This is a clickable Tag!</com-tag>
  `,
});

export const Selected = () => ({
  template: `
    <com-tag [selected]="true">This is a selected Tag!</com-tag>
  `,
});
