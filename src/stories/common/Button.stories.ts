import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import {
  ButtonModule,
  ButtonComponent,
  IconModule,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common / Button',
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
        <com-button (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">primary</ng-container>
        </com-button>
      </li>

      <!--Secondary-->
      <li style="padding: .5rem">
        <com-button secondary (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">secondary</ng-container>
        </com-button>
      </li>


      <!--Flat-->
      <li style="padding: .5rem">
        <com-button flat (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">flat</ng-container>
        </com-button>
      </li>

      <!--Warning-->
      <li style="padding: .5rem">
        <com-button warning (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">warning</ng-container>
        </com-button>
      </li>


      <!--Negative-->
      <li style="padding: .5rem">
        <com-button negative (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">negative</ng-container>
        </com-button>
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
        <com-button fill (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">primary</ng-container>
        </com-button>
      </li>

      <!--Secondary-->
      <li style="padding: .5rem">
        <com-button secondary fill (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">secondary</ng-container>
        </com-button>
      </li>


      <!--Flat-->
      <li style="padding: .5rem">
        <com-button flat fill (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">flat</ng-container>
        </com-button>
      </li>

      <!--Warning-->
      <li style="padding: .5rem">
        <com-button warning fill (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">warning</ng-container>
        </com-button>
      </li>


      <!--Negative-->
      <li style="padding: .5rem">
        <com-button negative fill (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">negative</ng-container>
        </com-button>
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
        <com-button transparent (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">primary</ng-container>
        </com-button>
      </li>

      <!--Secondary-->
      <li style="padding: .5rem">
        <com-button secondary transparent (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">secondary</ng-container>
        </com-button>
      </li>


      <!--Flat-->
      <li style="padding: .5rem">
        <com-button flat transparent (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">flat</ng-container>
        </com-button>
      </li>

      <!--Warning-->
      <li style="padding: .5rem">
        <com-button warning transparent (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">warning</ng-container>
        </com-button>
      </li>


      <!--Negative-->
      <li style="padding: .5rem">
        <com-button negative transparent (click)="click($event)">
          <com-icon slot="icon">add</com-icon>
          <ng-container slot="text">negative</ng-container>
        </com-button>
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
        <com-button [badged]="true" (click)="click($event)">
          <com-icon slot="icon">error_outline</com-icon>
          <ng-container slot="text">default</ng-container>
        </com-button>
      </li>

      <li style="padding: .5rem">
        <com-button fill [badged]="true" (click)="click($event)">
          <ng-container slot="text">only text</ng-container>
        </com-button>
      </li>

      <li style="padding: .5rem">
        <com-button transparent [badged]="true" (click)="click($event)">
          <com-icon slot="icon">error_outline</com-icon>
        </com-button>
      </li>
    </ul>
  `,
});
