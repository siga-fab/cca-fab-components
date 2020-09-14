import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  IconModule,
  IconComponent,
} from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Icon',
  component: IconComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, IconModule],
    }),
  ],
};

export const Styles = () => ({
  template: `
    <div style="display: flex; flex-flow: row wrap">
      <!--Default-->
      <section style="padding: 1rem;">
        <cca-common-icon>face</cca-common-icon>
      </section>
      <section style="padding: 1rem;">
        <cca-common-icon size="32" color="red">face</cca-common-icon>
      </section>
      <section style="padding: 1rem;">
        <cca-common-icon size="48" color="rgb(120, 0, 0)">face</cca-common-icon>
      </section>
      <section style="padding: 1rem;">
        <cca-common-icon size="64" color="#567700">face</cca-common-icon>
      </section>
    </div>
  `,
});
