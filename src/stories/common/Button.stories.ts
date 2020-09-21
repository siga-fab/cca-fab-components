import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import {
  ButtonComponent,
  ButtonModule,
  IconModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule, IconModule],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: '#cccccc' },
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#202124' },
      ],
    },
  },
};

export const Default = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <ul style="display: flex; flex-flow: row wrap; list-style-type: none;">

      <!--Primary-->
      <li style="padding: .5rem">
        <cca-common-button (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">primary</ng-container>
        </cca-common-button>
      </li>

      <!--Secondary-->
      <li style="padding: .5rem">
        <cca-common-button secondary (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">secondary</ng-container>
        </cca-common-button>
      </li>


      <!--Flat-->
      <li style="padding: .5rem">
        <cca-common-button flat (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">flat</ng-container>
        </cca-common-button>
      </li>

      <!--Warning-->
      <li style="padding: .5rem">
        <cca-common-button warning (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">warning</ng-container>
        </cca-common-button>
      </li>


      <!--Negative-->
      <li style="padding: .5rem">
        <cca-common-button negative (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">negative</ng-container>
        </cca-common-button>
      </li>
    </ul>
  `,
});

export const Fill = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <ul style="display: flex; flex-flow: row wrap; max-width: 100rem; list-style-type: none;">
      <!--Primary-->
      <li style="padding: .5rem">
        <cca-common-button type="fill" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">primary</ng-container>
        </cca-common-button>
      </li>

      <!--Secondary-->
      <li style="padding: .5rem">
        <cca-common-button secondary type="fill" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">secondary</ng-container>
        </cca-common-button>
      </li>


      <!--Flat-->
      <li style="padding: .5rem">
        <cca-common-button flat type="fill" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">flat</ng-container>
        </cca-common-button>
      </li>

      <!--Warning-->
      <li style="padding: .5rem">
        <cca-common-button warning type="fill" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">warning</ng-container>
        </cca-common-button>
      </li>


      <!--Negative-->
      <li style="padding: .5rem">
        <cca-common-button negative type="fill" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">negative</ng-container>
        </cca-common-button>
      </li>
    </ul>
  `,
});

export const Transparent = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <ul style="display: flex; flex-flow: row wrap; max-width: 100rem; list-style-type: none;">
      <!--Primary-->
      <li style="padding: .5rem">
        <cca-common-button type="transparent" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">primary</ng-container>
        </cca-common-button>
      </li>

      <!--Secondary-->
      <li style="padding: .5rem">
        <cca-common-button secondary type="transparent" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">secondary</ng-container>
        </cca-common-button>
      </li>


      <!--Flat-->
      <li style="padding: .5rem">
        <cca-common-button flat type="transparent" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">flat</ng-container>
        </cca-common-button>
      </li>

      <!--Warning-->
      <li style="padding: .5rem">
        <cca-common-button warning type="transparent" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">warning</ng-container>
        </cca-common-button>
      </li>


      <!--Negative-->
      <li style="padding: .5rem">
        <cca-common-button negative type="transparent" (click)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">negative</ng-container>
        </cca-common-button>
      </li>
    </ul>
  `,
});

export const Badged = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <ul style="display: flex; flex-flow: row wrap; max-width: 100rem; list-style-type: none;">
      <li style="padding: .5rem">
        <cca-common-button [badged]="true" (click)="click($event)">
          <cca-common-icon slot="icon">error_outline</cca-common-icon>
          <ng-container slot="text">default</ng-container>
        </cca-common-button>
      </li>

      <li style="padding: .5rem">
        <cca-common-button [badged]="true" (click)="click($event)">
          <ng-container slot="text">only text</ng-container>
        </cca-common-button>
      </li>

      <li style="padding: .5rem">
        <cca-common-button type="transparent" [badged]="true" (click)="click($event)">
          <cca-common-icon slot="icon">error_outline</cca-common-icon>
        </cca-common-button>
      </li>
    </ul>
  `,
});
