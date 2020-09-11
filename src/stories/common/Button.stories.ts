import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

import {
  ButtonModule,
  IconModule,
  ButtonComponent,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule, IconModule],
    }),
  ],
};

export const Styles = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <div style="display: flex; flex-flow: row wrap">

      <!--Primary-->
      <section style="padding: 1rem;">
        <cca-common-button (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">primary</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button type="fill" (buttonClick)="click($event)">
          <ng-container slot="text">primary</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button type="transparent" (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
        </cca-common-button>
      </section>

      <!--Secondary-->
      <section style="padding: 1rem;">
        <cca-common-button secondary (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">secondary</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button secondary type="fill" (buttonClick)="click($event)">
          <ng-container slot="text">secondary</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button secondary type="transparent" (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
        </cca-common-button>
      </section>

      <!--Flat-->
      <section style="padding: 1rem;">
        <cca-common-button flat (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">flat</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button flat type="fill" (buttonClick)="click($event)">
          <ng-container slot="text">flat</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button flat type="transparent" (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
        </cca-common-button>
      </section>

      <!--Warning-->
      <section style="padding: 1rem;">
        <cca-common-button warning (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">warning</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button warning type="fill" (buttonClick)="click($event)">
          <ng-container slot="text">warning</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button warning type="transparent" (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
        </cca-common-button>
      </section>

      <!--Negative-->
      <section style="padding: 1rem; background-color: #234B90; border-radius: .5rem">
        <cca-common-button negative (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
          <ng-container slot="text">negative</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button negative type="fill" (buttonClick)="click($event)">
          <ng-container slot="text">negative</ng-container>
        </cca-common-button>
        <br>
        <cca-common-button negative type="transparent" (buttonClick)="click($event)">
          <cca-common-icon slot="icon">add</cca-common-icon>
        </cca-common-button>
      </section>
    </div>
`,
});

export const Outline = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <cca-common-button (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
      <ng-container slot="text">nova</ng-container>
    </cca-common-button>
    <br>
    <cca-common-button (buttonClick)="click($event)">
      <ng-container slot="text">nova</ng-container>
    </cca-common-button>
    <br>
    <cca-common-button (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
    </cca-common-button>
  `,
});

export const Fill = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <cca-common-button type="fill" (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
      <ng-container slot="text">nova</ng-container>
    </cca-common-button>
    <br>
    <cca-common-button type="fill" (buttonClick)="click($event)">
      <ng-container slot="text">nova</ng-container>
    </cca-common-button>
    <br>
    <cca-common-button type ="fill" (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
    </cca-common-button>
  `,
});

export const Transparent = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <cca-common-button type="transparent" (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
      <ng-container slot="text">nova</ng-container>
    </cca-common-button>
    <br>
    <cca-common-button type="transparent" (buttonClick)="click($event)">
      <ng-container slot="text">nova</ng-container>
    </cca-common-button>
    <br>
    <cca-common-button type="transparent" (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
    </cca-common-button>
  `,
});

export const Warning = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <cca-common-button warning (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
      <ng-container slot="text">warning</ng-container>
    </cca-common-button>
    <br>
    <cca-common-button warning type="fill" (buttonClick)="click($event)">
      <ng-container slot="text">warning</ng-container>
    </cca-common-button>
    <br>
    <cca-common-button warning type="transparent" (buttonClick)="click($event)">
      <cca-common-icon slot="icon">add</cca-common-icon>
    </cca-common-button>
  `,
});

export const Negative = () => ({
  props: {
    click: action('This was clicked OMG'),
  },
  template: `
    <section style="background-color: #234B90; padding: 1rem; height: 100vh">
      <cca-common-button negative (buttonClick)="click($event)">
        <cca-common-icon slot="icon">add</cca-common-icon>
        <ng-container slot="text">negative</ng-container>
      </cca-common-button>
      <br>
      <cca-common-button negative type="fill" (buttonClick)="click($event)">
        <ng-container slot="text">negative</ng-container>
      </cca-common-button>
      <br>
      <cca-common-button negative type="transparent" (buttonClick)="click($event)">
        <cca-common-icon slot="icon">add</cca-common-icon>
      </cca-common-button>
    </section>
  `,
});
