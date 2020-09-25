import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../../projects/common/src/public-api';

export default {
  title: 'Common | Icon',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, IconModule],
    }),
  ],
};

export const Default = () => ({
  template: `
    <div style="display: flex; flex-flow: row wrap">
      <!--Default-->
      <section style="padding: 1rem;">
        <com-icon>face</com-icon>
      </section>
      <section style="padding: 1rem;">
        <com-icon size="32" color="red">face</com-icon>
      </section>
      <section style="padding: 1rem;">
        <com-icon size="48" color="rgb(120, 0, 0)">face</com-icon>
      </section>
      <section style="padding: 1rem;">
        <com-icon size="64" color="#567700">face</com-icon>
      </section>
    </div>
  `,
});
