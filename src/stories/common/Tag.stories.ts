import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  TagComponent,
  TagModule,
} from '../../../projects/common/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';

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
    <div style="margin-bottom: 1.5rem">
      <com-tag secondary>This is a Tag!</com-tag>
    </div>

    <div>
      <com-tag invalid="true">This is a Tag!</com-tag>
    </div>
  `,
});

export const Closable = () => ({
  props: {
    close: action('close'),
  },
  template: `
    <com-tag closable (closed)="close()">This is a closable Tag!</com-tag>
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
